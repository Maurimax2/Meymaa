/* Admin: log in, and read the order log.
   POST { key }  → sets an HttpOnly cookie when the key matches ADMIN_KEY
   DELETE        → clears it
   GET           → the most recent orders, newest first */
import { list, get } from '@vercel/blob';
import { COOKIE, keyMatches, authed, blobToken } from './_lib.mjs';

export const config = { maxDuration: 30 };

const PAGE = 200;      // plenty for this shop; the list is fetched per record

export default async function handler(req, res) {
  const token = blobToken();

  if (req.method === 'POST') {
    const key = req.body && req.body.key;
    if (!process.env.ADMIN_KEY) return res.status(503).json({ error:'admin-key-not-set' });
    if (!keyMatches(key)) return res.status(401).json({ error:'bad-key' });
    // HttpOnly so page scripts cannot read it back out; Strict so it is not
    // sent from anywhere but the admin page itself.
    res.setHeader('Set-Cookie', COOKIE + '=' + encodeURIComponent(String(key)) +
      '; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=' + (60 * 60 * 12));
    return res.status(200).json({ ok:true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', COOKIE + '=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    return res.status(200).json({ ok:true });
  }

  if (req.method !== 'GET') { res.setHeader('Allow','GET, POST, DELETE'); return res.status(405).json({ error:'method' }); }
  if (!authed(req)) return res.status(401).json({ error:'unauthorized' });
  if (!token) return res.status(503).json({ error:'storage-not-configured' });

  try {
    const { blobs } = await list({ prefix:'orders/', limit:PAGE, token });
    // The pathname leads with the ISO timestamp, so this sorts by time.
    blobs.sort((a, b) => (a.pathname < b.pathname ? 1 : -1));
    const orders = await Promise.all(blobs.map(async (b) => {
      try {
        const r = await get(b.pathname, { access:'private', token });
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
