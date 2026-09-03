/**
 * Re-generates the optimised artwork in this folder from the original
 * full-resolution files. Only needs re-running when a source image changes.
 *
 *   node standalone/images/prepare.mjs <source-folder> [more folders...]
 *
 * Sources are the player cut-outs and league marks supplied by the brand.
 * Everything is trimmed to its alpha bounding box, resized, and written as
 * WebP with transparency so it can be inlined as a data: URI without
 * bloating the single-file build.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const roots = process.argv.slice(2);
if (!roots.length) {
  console.error('usage: node prepare.mjs <source-folder> [more folders...]');
  process.exit(1);
}

/**
 * key → [source filename fragment, target size, webp quality].
 *
 * The filename fragment is matched as a case-insensitive substring, so the
 * accented names survive whichever Unicode normalisation the source folder
 * happens to use. The size is a height; prefix it with `w` (`'w420'`) to fit
 * to a width instead, which is what the near-square posters want.
 *
 *   p-*   player cut-outs, transparent — plan cards and the hero
 *   l-*   competition marks, transparent — beside each league name
 *   po-*  league key art, opaque — the poster wall
 *   c-*   player photography, opaque — the content rails
 */
const JOBS = {
  'p-ronaldo':     ['Ronaldo - FootyRenders.png', 660, 68],
  'p-haaland':     ['land - FootyRenders.png', 660, 68],
  'p-yamal':       ['lamine-yamal', 660, 68],
  'p-messi':       ['Messi - FootyRenders 2.png', 660, 68],
  'p-alvarez':     ['lvarez - FootyRenders.png', 620, 66],
  'l-epl':         ['english-premier-league--no-text', 240, 80],
  'l-laliga':      ['spain_la-liga_3000', 240, 80],
  'l-seriea':      ['italy_serie-a_3000x3000.football-logos.cc.png', 240, 80],
  'l-bundesliga':  ['germany_bundesliga_3000', 240, 80],
  'l-ucl':         ['uefa-champions-league_3000', 240, 80],
  'l-spl':         ['saudi-professional-league_3000', 240, 80],
  'po-epl':        ['IMG_5253', 'w400', 52],
  'po-ucl':        ['IMG_5257', 'w400', 52],
  'po-laliga':     ['IMG_5252', 'w400', 52],
  'po-seriea':     ['IMG_5254', 'w400', 52],
  'po-bundesliga': ['IMG_5256', 'w400', 52],
  'po-ligue1':     ['IMG_5255', 'w400', 52],
  'c-football':    ['IMG_5250', 560, 58],
  'c-live':        ['IMG_5249', 560, 58],
  'c-sports':      ['newcat/ufc.png', 560, 56],
  'c-kids':        ['newcat/kids.png', 480, 60],
  'c-anime':       ['newcat/anime.png', 520, 56],
  'c-drama':       ['newcat/drama.jpg', 520, 56],
  /* A channel mark rather than a photograph: sits contained on the tile,
     white ground already knocked out. */
  'c-news':        ['newcat/aljazeera.png', 300, 62],

  /* Movie and series key art, shown at title size in the streaming rail. */
  'm-oppenheimer': ['IMG_5320', 'w320', 56],
  'm-batman':      ['IMG_5322', 'w320', 54],
  'm-odyssey':     ['IMG_5319', 'w320', 54],
  'm-spiderman':   ['IMG_5318', 'w320', 54],
  'm-got':         ['IMG_5321', 'w320', 54],
  'm-breakingbad': ['IMG_5323', 'w320', 54],
  'm-lacasa':      ['IMG_5326', 'w320', 54],
  'm-walkingdead': ['IMG_5325', 'w320', 54],
  'm-fury':        ['IMG_5324', 'w320', 54],

  /* Character cut-outs, background removed, for the lineup band. */
  'x-walter':      ['cut/walter.png', 430, 62],
  'x-homelander':  ['cut/homelander.png', 430, 62],
  'x-tyrion':      ['cut/tyrion.png', 430, 62],
  'x-punisher':    ['cut/punisher.png', 430, 62],
  'x-jane':        ['cut/jane.png', 430, 62],

  /* MOOR TV hardware. */
  'd-stick':       ['moor/stick.png', 620, 68],

  /* Kept back from MAURIMAX so the two sites do not open on the same faces:
     the alternate Ronaldo and Messi renders, Kane, and two competition marks
     MAURIMAX has no slot for. */
  'p-ronaldo-b':   ['Ronaldo - FootyRenders 2.png', 680, 68],
  'p-messi-b':     ['Messi - FootyRenders.png', 660, 68],
  'p-kane':        ['moor/kane.png', 660, 66],
  'l-ligue1':      ['IMG_5248', 240, 80],
  'l-epl-text':    ['england_english-premier-league_3000', 240, 80],

  /* Mobile-money marks for the checkout. Supplied artwork, drawn for light
     backgrounds — the page sits them on a white plate rather than recolouring
     them. Sources are the four logos supplied by the brand. */
  'pay-bankily':   ['pay/bankily', 'w300', 74],
  'pay-masrvi':    ['pay/masrvi',  'w340', 76],
  'pay-sedad':     ['pay/sedad',   'w340', 76],
  'pay-click':     ['pay/click',   'w300', 74],

  /* Nature photography for the documentaries tile. */
  'c-docs':        ['ng_nature.png', 430, 56],
};

/** Every file under every source folder, so jobs can name any of them. */
function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '__MACOSX') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, out); else out.push(full);
  }
  return out;
}
// Deduplicated: the roots given on the command line often nest.
const pool = [...new Set(roots.flatMap((r) => walk(r)))];

function resolve(fragment) {
  const hit = pool.filter((f) => f.toLowerCase().includes(fragment.toLowerCase()));
  if (hit.length !== 1) {
    throw new Error(`"${fragment}" matched ${hit.length} files: ${hit.join(', ') || '(none)'}`);
  }
  return hit[0];
}

const py = `
import sys
from PIL import Image
inp, out, size, q = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
im = Image.open(inp).convert('RGBA')
bb = im.getchannel('A').getbbox()
if bb: im = im.crop(bb)
if size.startswith('w'):
    w = int(size[1:]); h = max(1, round(im.height * w / im.width))
else:
    h = int(size); w = max(1, round(im.width * h / im.height))
im = im.resize((w, h), Image.LANCZOS)
# Opaque sources keep no alpha channel — it only costs bytes.
if im.getchannel('A').getextrema()[0] == 255: im = im.convert('RGB')
im.save(out, 'WEBP', quality=q, method=6)
print(im.width, im.height)
`;

let total = 0;
for (const [key, [file, h, q]] of Object.entries(JOBS)) {
  const out = join(here, key + '.webp');
  const dims = execFileSync('python3', ['-c', py, resolve(file), out, String(h), String(q)])
    .toString().trim();
  const size = statSync(out).size;
  total += size;
  console.log(`${key.padEnd(14)} ${dims.padEnd(10)} ${(size / 1024).toFixed(1)} KB`);
}
console.log(`total ${(total / 1024).toFixed(1)} KB`);
