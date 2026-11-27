# LocalCreators — landing page

> **Rename (27 Nov 2026):** formerly **NanoLocal** — renamed to **LocalCreators** at the user's request, so the name says what the app is (local creators for local businesses). All user-visible references now use LocalCreators; the folder path is unchanged.

Pre-launch landing page for **LocalCreators**:
an Australian self-serve platform where small businesses buy bundles of local
nano creators (1,000–10,000 followers) for a flat $79–$99/month, with
suburb-level matching and automatic disclosure compliance. Launching soon in
Sydney.

## Files

- `index.html` — the page (semantic HTML, JSON-LD: Organization + Product + FAQPage)
- `styles.css` — all styling, animations, responsive rules (no framework)
- `script.js` — scroll reveals, counters, bars, suburb picker, email capture, leaderboard bars, creator filters, creator bottom sheet, mobile CTA
- `blog/` — SEO blog: `index.html` + 4 launch articles (see "Blog" below)
- `assets/logo.webp` — logo mark (also used in the nav)
- `assets/favicon.png` — 180×180 favicon, derived from the logo mark
- `assets/og-image.jpg` — 1200×630 OG/social image, referenced by `og:image` + `twitter:image`
- `assets/hero-creator.jpg`, `assets/hero-cafe.jpg`, `assets/creator-portrait.jpg` — generated photos used in the hero phone frame, photo band, leaderboard and creator cards
- `sitemap.xml`, `robots.txt` — SEO files (point at getlocalcreators.vercel.app)

## Preview locally

```bash
cd site
python3 -m http.server 8000
# open http://localhost:8000
```

No build step, no npm install. Just static files.

## Deploy to Vercel

Suggested project name: **`getlocalcreators`** → `https://getlocalcreators.vercel.app`

(The plain `localcreators` subdomain on vercel.app is already taken by an
unrelated site, hence `getlocalcreators`.)

In the Vercel dashboard: **Add New → Project → Import** the `site/` folder
(or the repo containing it) and deploy. Framework preset: **Other**. No
environment variables are needed. The `canonical`, `sitemap.xml`,
`robots.txt` and JSON-LD URLs already point at `getlocalcreators.vercel.app` — if
the project name ends up different, search-replace that domain in
`index.html`, `sitemap.xml` and `robots.txt`.

## Email capture — Mailchimp (wired up 27 Nov 2026)

The waitlist forms submit to the user's real Mailchimp list **without
leaving the page and without opening a new tab**: `script.js` uses JSONP
against the `post-json` endpoint and shows an in-page toast on success
("You're on the list! We'll be in touch once the app is ready.") or
failure ("Something went wrong — please try again."). Signups are also
saved to `localStorage` (`localcreators_waitlist`) as a backup.

- Form action (from the supplied embed code):
  `https://gmail.us6.list-manage.com/subscribe/post?u=1cef3766ef227139e3c699e85&id=536a3e4923&f_id=00d480e5f0`
- JSONP endpoint used: `.../subscribe/post-json?u=1cef3766ef227139e3c699e85&id=536a3e4923`
- `SOURCE_TAG = "LocalCreators"` is sent as the hidden `SOURCE` merge
  field, so signups from this page are labelled in Mailchimp.
- Honeypot field `b_1cef3766ef227139e3c699e85_536a3e4923` is sent empty.
- Mailchimp's `mc-validate.js` and its SMS-phone code were **not**
  included — they are not needed for this form.
- Reference copy of the supplied embed facts:
  `~/workspace/nanolocal-landing/mailchimp-embed-reference.html`

## Design elevation (27 Nov 2026, pass 2)

Inspired by Posted's live leaderboard/queue patterns and Mobbin-style
mobile patterns (stacked lists with avatars + badges, segmented controls,
filter chips, bottom sheets, sticky mobile CTA):

- **Leaderboard** — "This week's local leaderboard" with rank badges,
  avatars, animated view bars and a segmented category filter. Labelled as
  an illustrative example of the bundle dashboard.
- **Creator cards** — photo cards with niche filter chips; tapping a card
  opens a bottom sheet (mobile) / centred dialog (desktop) with the
  creator's stats and a "Reserve in your bundle" CTA.
- **Sticky mobile CTA** — dismissible bottom bar on ≤720px screens.
- **Generated assets** — all imagery is AI-generated for this site (no
  unverified stock URLs): logo mark, OG image, hero + café + portrait
  photos, all in the eucalyptus/coral/sunshine palette.
- **Motion** — staggered reveals, button shine sweep, card hover lift,
  animated leaderboard bars on scroll into view.
- **Suburb picker** — horizontal scroll-snap row on mobile.

No Mobbin connector exists in Muse, so Mobbin patterns were taken from
its public leaderboard / UI-elements pages via web search. Posted's design
was studied at postedapp.com and help.postedapp.com — patterns borrowed,
branding and copy not copied.

## Blog

`blog/index.html` plus 4 launch articles, each with SEO title/meta,
canonical, OG/Twitter tags, JSON-LD BlogPosting, hero image, internal
links and a waitlist capture form:

- `nano-influencer-marketing-australia.html` — nano influencer marketing Australia
- `ugc-creators-sydney.html` — UGC creators Sydney
- `influencer-marketing-cafes-restaurants-australia.html` — influencer marketing for cafés/restaurants Australia
- `how-much-do-nano-creators-cost-australia.html` — nano creator costs Australia

All blog facts are from the verified research only (Virev 2026, ABS June
2025, Posted help centre Oct 2026, TRA June 2025, ACCC March 2026) — no
invented stats, testimonials or case studies. All blog URLs are in
`sitemap.xml`.

## Still needs the user's input

- **Mailchimp check** — wired up (see above). After deploy, submit a test
  email and confirm it lands in Mailchimp with SOURCE = "LocalCreators".
- **Name** — settled: **LocalCreators** (renamed from NanoLocal on
  27 Nov 2026). Vercel project name suggestion is `getlocalcreators`.
- **Contact email** — the footer currently uses `hello@localcreators.com.au`
  as a placeholder; confirm it is a real inbox or change it.
- **Google Search Console** — submit the sitemap after deploy and watch
  which queries bring impressions; keyword note is at
  `~/workspace/research_notes/nanolocal-landing/keywords.md`.
  Verification readiness: after deploy, add the property
  `https://getlocalcreators.vercel.app/` in Search Console as a URL-prefix
  property. Verify ownership with either the **HTML file** method (upload
  the file Google gives you to this folder — the site root, so it is served
  at `https://getlocalcreators.vercel.app/<google-file>.html`) or the **HTML
  meta tag** method (paste Google's tag into the `<head>` of `index.html`).
  Do NOT use DNS verification — the `vercel.app` DNS is not user-controlled.
  No verification token exists yet; Google issues one during setup, so do
  not invent or hard-code one. After verification, submit
  `https://getlocalcreators.vercel.app/sitemap.xml` in Search Console.

## Review fixes (27 Nov 2026, user feedback rounds)

- **New logo** — coral map pin with a white play triangle on deep green (generated, `assets/logo.webp`); communicates local + video creators. Favicon regenerated from it. Blog headers now use the logo image too.
- **Realistic hero phone** — titanium-framed device with Dynamic Island, side buttons, status bar and home indicator; the screen shows a real LocalCreators app UI (stories row, feed post, bundle progress card, tab bar). Floating cards move below the phone on mobile instead of covering it. **Phone is a true 19.5:9 smartphone: 300 × 624 px outer (screen 278 × 602), scaled to 264 × 546 px on mobile (screen 242 × 524)** — same ratio at every width.
- **Wording** — every "pre-register" is now "Join the waitlist"; the odd "Join 0 others" line is gone.
- **Stats audit** — hero now shows only decision-helping stats (2.1% vs 0.5% engagement, $110 vs $636 post cost, creators keep 85–90%). The 2.66M small-businesses market figure and the Virev Australian-slice 3.80% line were removed as not consumer-facing; the FAQ's unsourced "$300–$3,000" micro range now uses the verified $636 median.
- **Comparison redesigned** — the dense text table is now three visual cards (LocalCreators featured vs Posted vs typical agency) with big prices, check/cross lists and colour accents.
- **Leaderboard redesigned** — rank badges, larger avatars, full-width view bars, views + engagement as a clear stat block; stacks cleanly on mobile.
- **Mobile optimisation** — 44px minimum tap targets, no horizontal overflow guards (`overflow-x: clip`), smaller hero type on small screens, sticky mobile CTA reserves body space so it never hides content, blog tables scroll horizontally. Hero grid uses `minmax(0, 1fr)` so long words can't blow the layout out; the capture input no longer stretches to 260px tall on mobile.
- **Niche chips & leaderboard filter** — both are now clean horizontal scrollable chip rows with no pill-container background and no wrapping: every chip fits on one line, scrolls sideways on mobile, evenly sized with `flex-shrink: 0`.
- **Creator cards rebuilt (avatar-led)** — the old banner-photo cards are now proper profile cards: circular avatar left, handle + suburb, niche pill, followers / engagement / views stat row, "Rising" badge on the top creator. Real CSS grid spacing, so the avatar can never overlap the name. The creators section sits on its own soft-green band so cards sit on a distinct background. A `<noscript>` fallback keeps reveal content visible with JS off.
- **Imagery refresh** — every creator now has their own distinct portrait (no repeats): `assets/portrait-jules.jpg`, `assets/portrait-sarah.jpg`, `assets/portrait-bondi.jpg`, `assets/portrait-parra.jpg` (all 1600×1600), plus Mia's `assets/hero-creator.jpg`. The old shared `assets/creator-portrait.jpg` is retired and referenced nowhere. Each blog article has its own hero image: `assets/blog-nano-creators.jpg`, `assets/blog-ugc-sydney.jpg`, `assets/blog-cafes-restaurants.jpg`, `assets/blog-creator-costs.jpg` (all 1920×1280, also used on the blog index). All avatars use `object-fit: cover` with `aspect-ratio: 1/1`, so nothing is stretched or squashed.

## Honesty notes

- No testimonials, customer logos or fake stats anywhere on the page.
  All numbers are sourced: Virev 2026 (2.1% vs 0.5% engagement; $110 vs
  $636 median post), Posted help centre Oct 2026 ($500/mo, $5,000 contest
  minimum). The 2.66M small-business figure and the Virev Australian-slice
  3.80% line were removed in the review round as not consumer-facing.
- Suburb panels are labelled "Example bundle" — the creator roster is
  being built, not live.
- The leaderboard and creator cards are labelled as illustrative examples
  of the bundle dashboard — their handles and figures are examples, not
  live results or real creators.
