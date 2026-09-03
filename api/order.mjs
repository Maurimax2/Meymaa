/* Takes one order from the checkout sheet and stores it.
   Both the record and the payment screenshot are written PRIVATE: they carry
   the customer's name, phone and a picture of their bank app, so a public
   URL — even an unguessable one — is the wrong default. They are read back
   only through /api/orders and /api/proof, behind the admin key. */
import { put } from '@vercel/blob';
import { str, num, makeRef, blobToken } from './_lib.mjs';

export const config = { maxDuration: 30 };

/* Vercel caps a function body at 4.5 MB. The client downscales before it
   uploads, so this only catches something pathological. */
const MAX_B64 = 3_800_000;
const KINDS = { 'image/jpeg':'jpg', 'image/jpg':'jpg', 'image/png':'png', 'image/webp':'webp' };

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({ error:'method' }); }
  const token = blobToken();
  if (!token) return res.status(503).json({ error:'storage-not-configured' });

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const name = str(b.name, 80);
  const phone = str(b.phone, 24);
  if (name.length < 2 || phone.replace(/\D/g,'').length < 8) {
    return res.status(400).json({ error:'invalid' });
  }

  const ref = makeRef();
  const at = new Date().toISOString();
  let proofPath = null;

  try {
    const m = /^data:([a-z/+.-]+);base64,(.+)$/i.exec(str(b.proof, 6_000_000));
    if (m && KINDS[m[1].toLowerCase()]) {
      if (m[2].length > MAX_B64) return res.status(413).json({ error:'too-large' });
      const bytes = Buffer.from(m[2], 'base64');
      if (!bytes.length) return res.status(400).json({ error:'bad-image' });
      const saved = await put('proofs/' + ref + '.' + KINDS[m[1].toLowerCase()], bytes, {
        access:'private', contentType:m[1].toLowerCase(), token, addRandomSuffix:true
      });
      proofPath = saved.pathname;
    }

    const order = { ref, at, name, phone,
      device: str(b.device, 40), plan: str(b.plan, 60), months: num(b.months),
      price: num(b.price), pay: str(b.pay, 20), notes: str(b.notes, 600),
      lang: str(b.lang, 4), proofPath };

    // The timestamp leads the pathname so a prefix list comes back in order.
    await put('orders/' + at + '-' + ref + '.json', JSON.stringify(order), {
      access:'private', contentType:'application/json', token, addRandomSuffix:false
    });
    return res.status(200).json({ ok:true, ref });
  } catch (e) {
    console.error('order store failed', e);
    return res.status(500).json({ error:'store-failed' });
  }
}
