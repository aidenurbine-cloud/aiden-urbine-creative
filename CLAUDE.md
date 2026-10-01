# CLAUDE.md · Aiden Urbine

Photo & video for outdoor, lifestyle, and gear brands. Missoula, Montana.

## Direction (Sept 2026 redesign)
The old grey, template-y site felt like "no human had anything to do with it."
The reference is makaylacrist.com: warm cream paper, a handwritten wordmark,
small tracked serif caps down a left sidebar, and one quiet column of photos.
The site should feel personal and handmade. Photos lead, in full color, at their real shape.

## Rules
- Background is bone (`--paper` #F2EFE9), plain, no texture. Aiden rejected grey, cream and kraft.
- Photos sit straight on the paper in tight justified rows (8px gaps, rows of 2 to 4, equal height per row), NO borders, frames, tilts, tape, shadows or scrapbook touches (Aiden hated that).
- Never add grain, filters, or overlays on top of photos. Aiden's exports already have film grain.
- Never crop gallery photos, never dim them, never make them black and white.
- Fonts: TAY Slowpoke (`app/fonts/TAYSlowpokeRegular.woff2`, `--display`) for the name, nav items and page titles. Instrument Sans (`--sans`) for all body/UI text. Slowpoke is hand-lettered caps: never fake-italic it.
- Make it distinct from Mak: left-aligned sidebar with a live Missoula clock, client filter on the home gallery.
- Nav stays small and quiet. Only hover effect: hovered name italic, siblings fade. Aiden rejected big names, slide-in lines and a photo preview.
- No numbering, counts, frame numbers, section labels or hover tags anywhere (Aiden hated them). Names only.
- No scroll-triggered fade-ins (they caused blank gaps on the old site). Photos show their average color while loading.
- No em dashes in site copy. Copy is first person, in Aiden's voice.
- No custom cursor.

## Where things live
- `lib/projects.ts`: all content. Projects, photo order, favorites feed, about-page prints, email/IG.
  Photos carry real `w`/`h` and an average color `c`. When adding photos, get these with Python/PIL
  (see the generator approach: `ImageOps.exif_transpose(Image.open(p)).size`, and a 1x1 resize for color).
- `components/Sidebar.tsx`: nav (collapses to a top bar + menu on phones).
- `components/Feed.tsx`: the photo column and full-screen viewer.
- `app/(site)/`: every page, with the sidebar. `page.tsx` = home (favorites gallery), `work/[slug]` project pages, `about`, `contact` (mailto form). `/work` redirects home.
- Row sizes are the `DESKTOP`/`PHONE` target lists in `components/Feed.tsx` (bigger number = more photos per row).
- Collections (sub-projects, e.g. MKC's 001s, unboxings): `lib/collections/<client>.json`, built by
  `python3 scripts/import-collections.py <client> "/path/to/folder"` (one subfolder per collection; leading
  number = order; optional notes.txt and cover.jpg; photos and .mp4/.mov). A client with collections gets a
  cover grid at /work/<client> and a page per collection at /work/<client>/<collection>; its collections show
  in the sidebar only while you're inside that client. MKC's current five collections are PLACEHOLDERS
  grouped from the old 26 photos until Aiden sends real folders.
- `/home` redirects to `/` (old links).
