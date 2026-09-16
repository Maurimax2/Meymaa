/* Shared helpers for the order endpoints.
   Kept dependency-free apart from @vercel/blob, which the build installs on
   its own so the site's static build never has to pull in the whole
   Next.js dependency tree that lives in the root package.json. */
import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'moortv_admin';
/* Twelve hours: long enough to work a day, short enough that a forgotten
   session on a shared phone does not stay open indefinitely. */
export const SESSION_TTL = 60 * 60 * 12;

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
/** Constant-time compare, so a secret cannot be guessed a character at a time. */
function sameString(given, want) {
  if (!want || !given) return false;
  var a = Buffer.from(String(given));
  var b = Buffer.from(String(want));
  if (a.length !== b.length) return false;
  try { return timingSafeEqual(a, b); } catch (e) { return false; }
}
/* Environment values are trimmed. Pasting a secret into a dashboard field
   very easily carries a trailing space or newline, and an untrimmed compare
   then rejects the right password with no way to see why. What the visitor
   types is trimmed for the same reason — a phone keyboard likes to append a
   space. Whitespace inside a password is still honoured; only the ends go. */
function envStr(name) {
  return String(process.env[name] == null ? '' : process.env[name]).trim();
}
export function adminKeySet() { return envStr('ADMIN_KEY') !== ''; }

/* The account name is not a secret — it ships in the page and only exists so
   the login looks like a login. ADMIN_USER can override it; the password is
   ADMIN_KEY and is never written down in this repo. */
export function adminUser() {
  return envStr('ADMIN_USER') || 'MOORTV';
}
export function userMatches(given) {
  // Compared case-insensitively. It is a name rather than a secret, and a
  // phone keyboard that quietly lowercases it should not read as a bad login.
  return String(given == null ? '' : given).trim().toLowerCase()
       === adminUser().toLowerCase();
}
export function keyMatches(given) {
  return sameString(String(given == null ? '' : given).trim(), envStr('ADMIN_KEY'));
}

/* The cookie carries a signed token rather than the password itself, so the
   secret never sits in the browser's cookie jar and a stolen cookie expires.
   Signed with ADMIN_KEY, which means rotating the password also invalidates
   every session that was open under the old one. */
function sign(msg) {
  // The same trimmed value the password is compared against, or a stray
  // newline in the dashboard would invalidate every session it signed.
  return createHmac('sha256', envStr('ADMIN_KEY')).update(String(msg)).digest('hex');
}
export function makeSession() {
  var exp = Date.now() + SESSION_TTL * 1000;
  return exp + '.' + sign(exp);
}
export function sessionValid(tok) {
  var m = /^(\d{10,16})\.([a-f0-9]{64})$/.exec(String(tok || ''));
  if (!m || !adminKeySet()) return false;
  if (Number(m[1]) < Date.now()) return false;          // expired
  return sameString(m[2], sign(m[1]));
}
export function cookieKey(req) {
  var raw = req.headers.cookie || '';
  var hit = raw.split(';').map(function (c) { return c.trim(); })
    .filter(function (c) { return c.indexOf(COOKIE + '=') === 0; })[0];
  return hit ? decodeURIComponent(hit.slice(COOKIE.length + 1)) : '';
}
/** Either a valid session cookie or an explicit key header, so curl works too. */
export function authed(req) {
  return sessionValid(cookieKey(req)) || keyMatches(req.headers['x-admin-key']);
}
/* Connecting a Blob store normally sets BLOB_READ_WRITE_TOKEN. A store
   connected under a prefix sets <PREFIX>_READ_WRITE_TOKEN instead, and the
   difference is invisible from the site: the order log simply reports that
   storage is not configured. So the standard name wins, and any other
   read-write token in the environment is accepted rather than ignored. */
/* A store can be reached two ways. The old way is a static read-write token.
   The new way gives the function its own identity: Vercel sets BLOB_STORE_ID
   and the SDK exchanges the deployment's OIDC token for access, with no secret
   to copy anywhere. Requiring the static token made a perfectly connected
   store of the second kind report itself as no storage at all. */
export function blobConfigured() {
  return blobToken() !== '' || envStr('BLOB_STORE_ID') !== '';
}
/* Passed to every blob call. Empty when there is no static token, which is
   what lets the SDK fall back to the OIDC identity — sending token:'' would
   instead look like an explicit, and wrong, credential. */
export function blobOpts() {
  var t = blobToken();
  return t ? { token: t } : {};
}
export function blobToken() {
  var direct = envStr('BLOB_READ_WRITE_TOKEN');
  if (direct) return direct;
  var names = Object.keys(process.env).filter(function (k) {
    return /_READ_WRITE_TOKEN$/.test(k) && envStr(k);
  }).sort();
  return names.length ? envStr(names[0]) : '';
}
