/* Streams one payment screenshot back to the admin page.
   The blobs are private, so they cannot be linked to directly — and an <img>
   cannot send an Authorization header, which is exactly why the admin login
   sets a cookie rather than keeping the key in JavaScript. */
import { get } from '@vercel/blob';
import { authed, blobToken } from './_lib.mjs';

export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow','GET'); return res.status(405).end(); }
  if (!authed(req)) return res.status(401).end();
  const token = blobToken();
  if (!token) return res.status(503).end();

  const path = String(req.query.p || '');
  // Only ever our own proofs, and never a traversal out of that prefix.
  if (!/^proofs\/[A-Za-z0-9._-]+$/.test(path)) return res.status(400).end();

  try {
    const r = await get(path, { access:'private', token });
    if (!r) return res.status(404).end();
    const buf = Buffer.from(await r.blob.arrayBuffer());
    res.setHeader('Content-Type', r.blob.type || 'application/octet-stream');
    res.setHeader('Cache-Control', 'private, max-age=600');
    return res.status(200).send(buf);
  } catch (e) {
    console.error('proof read failed', e);
    return res.status(500).end();
  }
}
