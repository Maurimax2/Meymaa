# MOOR TV

A streaming-subscription storefront for Mauritania. Arabic first (`dir="rtl"`),
French second, no framework, no bundler — `src/build.mjs` inlines one JS file
into one HTML file and copies the artwork out beside it.

## Deploying

Everything lives on `main`, so importing this repo into Vercel with the
defaults is the whole job. Nothing to configure, no branch to change.

1. **vercel.com → Add New → Project → import this repo → Deploy.**
   Leave every setting alone. `vercel.json` tells it what to run.
2. **Storage → create a Blob store → connect it to the project.**
   That sets `BLOB_READ_WRITE_TOKEN` by itself.
3. **Settings → Environment Variables → add `ADMIN_KEY`** — this is the
   password for `/admin`. The username is `MOORTV`; set `ADMIN_USER` too if
   you want a different one.
4. **Redeploy.** Environment variables only apply to deployments made after
   they are set, so the first deploy will not see them.

The site works without steps 2–4; the checkout just falls back to plain
WhatsApp instead of filing orders.

## Working on it

```bash
npm run dev       # builds to dist/ — open dist/index.html
npm run single    # moortv.html: the whole site in one portable file
```

`npm install` is only needed for the API functions (`@vercel/blob`); the site
build itself has no dependencies.

**Edit `src/`, never `dist/`** — the next build overwrites it.

| File | What it is |
| --- | --- |
| `src/index.src.html` | markup + all CSS, with `__LOGO_URI__` / `__IMG_MAP__` placeholders |
| `src/app.js` | the runtime: prices, artwork casting, both dictionaries, checkout |
| `src/admin.src.html` | the order log at `/admin`, self-contained |
| `src/images/` | artwork, plus `prepare.mjs` to regenerate it from originals |
| `api/*.mjs` | three serverless functions |

## Two regions

The first thing a visitor answers is where they are buying from, because it
decides both the prices and how they can pay. The answer is kept in
`localStorage` under `moortv.region` and the chip in the header reopens the
question — a wrong tap would otherwise show the wrong currency forever.

| | Mauritania (`mr`) | International (`intl`) |
| --- | --- | --- |
| Terms | 1 / 3 / 6 / 12 / 15 months, plus two-screen and the stick | 3 / 6 / 12 months |
| Prices | 500 – 4,500 MRU | 30 / 50 / 80 USDT |
| Paid with | Bankily, Masrvi, Sedad, Click | USDT on Tron, Ethereum or BNB |
| Hardware | the TV stick | hidden — nothing is shipped abroad |

`PLANS_INTL` in `app.js` is the international table and `PAY_USDT` holds the
three chains. Everything that prices or lists an offer goes through
`planList()` and `extraList()` rather than touching `PLANS` directly, so a
third region would be one more table and one more branch.

**The wallet addresses are the load-bearing part.** Ethereum and BNB Smart
Chain are both EVM chains and share one address; that repetition in `PAY_USDT`
is deliberate, not a copy-and-paste slip. A single wrong character sends a
customer's money somewhere no one can recover it, so the addresses are written
out whole rather than assembled from pieces, and the checkout carries a warning
that USDT must be sent on the network shown — sending on another one does not
bounce, it is simply gone. The TRC20 address carries a base58 checksum and it
was verified; the EVM address is all-lowercase and therefore has no checksum to
verify, so it can only be checked by eye against the wallet.

Two answers in the FAQ quote ouguiya prices and mobile money outright. Those
entries carry `arI` / `frI` variants that replace them abroad.

## The shop

**Offers.** Seven subscriptions on a horizontal shelf that drifts on its own
and stops the moment anyone touches it. `OFFER_ART` in `app.js` is the whole
look in one table: which footballer and which screen character stand in each
card, and its two colours. The colour is a ladder — blue at one month through
violet at fifteen — so the row reads as ascending; the two-device terms break
out into cyan because they are a different product, not a longer one.

Three things there break if they are changed carelessly:

- **The drift step must accumulate in its own variable**, not in
  `rail.scrollLeft`. The browser rounds that property to whole pixels, so
  reading it back each frame throws the sub-pixel remainder away and the rail
  never moves at all. `scrollLeft` also counts *down* from zero under RTL, so
  the sign of "forward" flips with the document direction.
- **`FIGURE_FIT` is why the two figures look the same size.** The renders are
  framed differently — some head-to-toe, some waist-up — so an equal box
  height gives wildly *unequal* heads. Each entry scales a figure and drops it
  so the crop lands on the chest. Tuned by eye; re-check the widest pairing
  (Yamal with Walter White) against the card width after any re-casting.
- **The two-device cards need narrow renders.** They stand a figure inside a
  152px frame; anything wider than about 0.6 of its height spills out.

**The hero** is a raked wall of key art, three rows at three speeds. It is
`direction:ltr` and that is load-bearing: each row is `max-content` wide and
gets placed at its grid area's inline start, which under RTL is the right
edge — a row translated −50% then walks clean off the left of the screen.

**Checkout** runs in three steps. Step two takes the name, the phone, the
device (a dropdown) and which of the four mobile-money services was used —
Bankily, Masrvi, Sedad, Click, all on the same number. The number appears only
after a service is picked, and the field is painted in that service's own
colours so it is recognisable without being read.

## The order log

| Route | What it does |
| --- | --- |
| `POST /api/order` | files one order; public, called by the checkout |
| `POST /api/orders` | admin login — sets an HttpOnly cookie if the pair matches |
| `GET /api/orders` | the order list, newest first |
| `DELETE /api/orders` | log out |
| `GET /api/proof?p=` | streams one payment screenshot |

Every order records its own `region` and `currency`, because 30 USDT and 30 MRU
are the same number and very different money — the admin page never assumes.
International orders also record the `network` and `address` the customer says
they paid to, which are the two things to check a screenshot against. Orders
filed before international sales existed have neither field and are read as
Mauritanian ouguiya.

**Both the record and the screenshot are written `access:'private'`.** They
carry the customer's name, phone and a picture of their bank app, so a public
URL — even an unguessable one — is the wrong default.

That privacy choice shapes the login. A private blob cannot be linked to
directly, and an `<img>` cannot send an `Authorization` header, so the admin
logs in once and the server sets an **HttpOnly** cookie; the images then load
through `/api/proof` on the strength of it. Keeping the key in JavaScript and
putting it in the image URLs would have leaked it into history and logs.

The cookie holds a **signed token, not the password** — `expiry.HMAC(expiry)`
under `ADMIN_KEY`, valid twelve hours. So the secret never sits in the browser's
cookie jar, a stolen cookie stops working on its own, and changing `ADMIN_KEY`
logs every open session out. A wrong username and a wrong password give the
same error, and both are compared in constant time.

The screenshot is downscaled to 1400px in the browser before upload: a phone
screenshot is 2–5 MB, slow on mobile data and over the function body limit
once base64'd, while 1400px of a bank receipt is still perfectly readable.

**Where the API is not running** — the single-file copy, any static host — the
POST fails and the checkout reverts to sending details over WhatsApp with the
screenshot as a second share gesture. Nothing dead-ends.

`ADMIN_KEY` is one shared password, not accounts: anyone who has it sees every
order. Rotate it by changing the variable and redeploying.

**Never commit the password.** This repository is public, and `/admin` shows
customer names, phone numbers and photographs of their banking apps. The
username lives in the code because it is not a secret; the password belongs in
the Vercel environment variable and nowhere else. A password committed once
stays in the git history and in every fork.

## Before going live

- **None of the imagery is licensed.** The player cut-outs came from
  FootyRenders and uniqrenders, the competition marks from football-logos.cc,
  and the film, series and character art is studio material. Photographs of
  footballers carry likeness rights on top of copyright, and league names and
  titles are trademarks. Removing a background changes none of that. Replace
  them with images you own or licensed, or delete the files — every slot falls
  back to type rather than breaking.
- **The four payment logos are bank trademarks.** Shown to say which services
  are accepted, unmodified, on white plates. Confirm that is acceptable to
  each bank.
- **The hardware is a Xiaomi TV stick sold under the MOOR TV name.** Confirm
  the model, its real specification (the 4K claim in `device.specs`
  particularly) and whether it may be resold rebranded.
- **The reviews and the subscriber figures are illustrative, not real.**
  Replace them. Publishing invented ones as if genuine would mislead customers.
- **Confirm the wallet addresses against your own wallet before taking a
  single order.** Read them from `PAY_USDT` in `src/app.js`, character by
  character. A crypto payment sent to a wrong address cannot be reversed,
  cancelled or refunded by anyone, and the customer will still expect their
  subscription.
- **Selling abroad widens the licensing exposure, it does not narrow it.**
  The content and imagery warnings above apply in every country the site now
  takes money from, under that country's law rather than Mauritania's.
- **You will be holding customer data** — names, phone numbers, pictures of
  banking apps. Delete what you no longer need, and tell customers you keep it.

## Notes

- Fonts load from Google Fonts, the only external request. Remove the two
  `<link>` tags in `<head>` to drop it; the CSS falls back to system faces.
- Checkout takes no payment. It records the order and hands it to WhatsApp.
- Contact details live at the top of `src/app.js`: `WA_DISPLAY`, `WA_E164`,
  `SNAP`. The same number serves all four payment services.
