/**
 * Builds the MOOR TV site.
 *
 *   node src/build.mjs               → dist/          (for local preview)
 *   node src/build.mjs --out <dir>   → <dir>/         (what Vercel runs)
 *   node src/build.mjs --single      → moortv.html    (one portable file)
 *
 * There is no framework and no bundler. The build inlines app.js into the
 * markup, writes the artwork out as separate files, and swaps the two
 * placeholders (`__LOGO_URI__`, `__IMG_MAP__`) for real paths.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, cpSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const imgDir = join(here, 'images');
const argv = process.argv.slice(2);

const outArg = argv.indexOf('--out');
const dist = outArg > -1 && argv[outArg + 1]
  ? resolve(argv[outArg + 1])
  : join(here, '..', 'dist');

const photos = readdirSync(imgDir).filter((f) => f.endsWith('.webp')).sort();
const js = readFileSync(join(here, 'app.js'), 'utf8');
const src = readFileSync(join(here, 'index.src.html'), 'utf8');
const admin = readFileSync(join(here, 'admin.src.html'), 'utf8');

const scriptTag = '<script src="app.js"></script>';
const mapTag = '__IMG_MAP__';

/* String.replace() eats `$` sequences in the replacement — and app.js uses `$`
   as its selector helper, so a plain string replacement silently corrupts it.
   A function replacer is passed through untouched. */
const put = (s, needle, value) => s.replace(needle, () => value);

/* ---------- multi-file build: index.html + admin.html + assets/ ---------- */
// Only assets/ is cleared, never the target itself: `--out` can point at a
// directory that holds other things.
rmSync(join(dist, 'assets'), { recursive: true, force: true });
mkdirSync(join(dist, 'assets'), { recursive: true });

const imgMap = '<script>window.MXIMG={' +
  photos.map((f) => JSON.stringify(f.replace(/\.webp$/, '')) + ':"assets/' + f + '"').join(',') +
  '};</script>';

const html = put(
  put(src.split('__LOGO_URI__').join('assets/logo.png'), mapTag, imgMap),
  scriptTag, '<script>\n' + js + '\n</script>');

writeFileSync(join(dist, 'index.html'), html);
writeFileSync(join(dist, 'admin.html'),
  admin.split('__LOGO_URI__').join('assets/logo.png'));
cpSync(join(imgDir, 'logo.png'), join(dist, 'assets', 'logo.png'));
for (const f of photos) cpSync(join(imgDir, f), join(dist, 'assets', f));

console.log(dist + '/index.html — ' + kb(html) + ' KB + admin.html + ' +
  (photos.length + 1) + ' asset files');

/* ---------- optional: everything in one file ----------
   Slower to first paint because the artwork is base64'd inline, but it runs
   from a USB stick, an email attachment or a file:// URL. */
if (argv.includes('--single')) {
  const b64 = (f) => 'data:image/webp;base64,' +
    readFileSync(join(imgDir, f)).toString('base64');
  const logo = 'data:image/png;base64,' +
    readFileSync(join(imgDir, 'logo.png')).toString('base64');
  const inlineMap = '<script>window.MXIMG={' +
    photos.map((f) => JSON.stringify(f.replace(/\.webp$/, '')) + ':' +
      JSON.stringify(b64(f))).join(',') + '};</script>';
  const one = put(
    put(src.split('__LOGO_URI__').join(logo), mapTag, inlineMap),
    scriptTag, '<script>\n' + js + '\n</script>');
  const file = join(here, '..', 'moortv.html');
  writeFileSync(file, one);
  console.log(file + ' — ' + kb(one) + ' KB (single file)');
}

function kb(s) { return (Buffer.byteLength(s) / 1024).toFixed(1); }
