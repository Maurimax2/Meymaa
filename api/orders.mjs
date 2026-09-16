/* Admin: log in, and read the order log.
   POST { user, key } → sets an HttpOnly session cookie when both match
   DELETE             → clears it
   GET                → the most recent orders, newest first */
import { list, get } from '@vercel/blob';
import { COOKIE, SESSION_TTL, userMatches, keyMatches, authed,
         makeSession, adminKeySet, blobConfigured, blobOpts } from './_lib.mjs';

export const config = { maxDuration: 30 };

const PAGE = 200;      // plenty for this shop; the list is fetched per record

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const b = req.body && typeof req.body === 'object' ? req.body : {};
    if (!adminKeySet()) return res.status(503).json({ error:'admin-key-not-set' });
    // Both halves are compared before the verdict, so a wrong name costs the
    // same time as a wrong password, and the error does not say which failed.
    const okUser = userMatches(b.user);
    const okKey = keyMatches(b.key);
    if (!okUser || !okKey) return res.status(401).json({ error:'bad-credentials' });
    // A signed token, not the password. HttpOnly so page scripts cannot read
    // it back out; Strict so it is not sent from anywhere but the admin page.
    res.setHeader('Set-Cookie', COOKIE + '=' + encodeURIComponent(makeSession()) +
      '; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=' + SESSION_TTL);
    return res.status(200).json({ ok:true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', COOKIE + '=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    return res.status(200).json({ ok:true });
  }

  if (req.method !== 'GET') { res.setHeader('Allow','GET, POST, DELETE'); return res.status(405).json({ error:'method' }); }
  if (!authed(req)) return res.status(401).json({ error:'unauthorized' });
  if (!blobConfigured()) {
    /* Which variables the function can actually see. NAMES ONLY — never a
       value — and only to someone already holding the admin password. Without
       this the page can say storage is missing but not whether the store was
       never connected, connected under a name the code does not look for, or
       added after the running build. */
    var seen = Object.keys(process.env)
      .filter(function (k) { return /BLOB|TOKEN|VERCEL_ENV/i.test(k); }).sort();
    return res.status(503).json({ error:'storage-not-configured', env: seen });
  }

  try {
    const opts = blobOpts();
    const { blobs } = await list({ prefix:'orders/', limit:PAGE, ...opts });
    // The pathname leads with the ISO timestamp, so this sorts by time.
    blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
    const orders = await Promise.all(blobs.map(async (b) => {
      try {
        const r = await get(b.pathname, { access:'private', ...opts });
        if (!r) return null;
        return JSON.parse(await r.blob.text());
      } catch (e) { return null; }
    }));
    return res.status(200).json({ orders: orders.filter(Boolean) });
  } catch (e) {
    console.error('order list failed', e);
    return res.status(500).json({ error:'list-failed' });
  }
}
