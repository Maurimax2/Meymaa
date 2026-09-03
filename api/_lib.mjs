/* Shared helpers for the order endpoints.
   Kept dependency-free apart from @vercel/blob, which the build installs on
   its own so the site's static build never has to pull in the whole
   Next.js dependency tree that lives in the root package.json. */
import { timingSafeEqual } from 'node:crypto';

export const COOKIE = 'moortv_admin';

export function str(v, max) {
  return String(v == null ? '' : v).trim().slice(0, max);
}
export function num(v) {
  var n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
/** Short, human-quotable reference — the customer reads it out on WhatsApp. */
export function makeRef() {
  var s = '';
  var abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // no I/O/0/1
  for (var i = 0; i < 6; i++) s += abc[Math.floor(Math.random() * abc.length)];
  return s;
}
/** Constant-time compare, so the key cannot be guessed a character at a time. */
export function keyMatches(given) {
  var want = process.env.ADMIN_KEY || '';
  if (!want || !given) return false;
  var a = Buffer.from(String(given));
  var b = Buffer.from(want);
  if (a.length !== b.length) return false;
  try { return timingSafeEqual(a, b); } catch (e) { return false; }
}
export function cookieKey(req) {
  var raw = req.headers.cookie || '';
  var hit = raw.split(';').map(function (c) { return c.trim(); })
    .filter(function (c) { return c.indexOf(COOKIE + '=') === 0; })[0];
  return hit ? decodeURIComponent(hit.slice(COOKIE.length + 1)) : '';
}
/** Either the login cookie or an explicit header, so curl works too. */
export function authed(req) {
  return keyMatches(cookieKey(req)) || keyMatches(req.headers['x-admin-key']);
}
export function blobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN || '';
}
