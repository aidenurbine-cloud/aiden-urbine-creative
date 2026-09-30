# CLAUDE.md · Aiden Urbine

Photo & video for outdoor, lifestyle, and gear brands. Missoula, Montana.

## Direction (Sept 2026 redesign)
The old grey, template-y site felt like "no human had anything to do with it."
The reference is makaylacrist.com: warm cream paper, a handwritten wordmark,
small tracked serif caps down a left sidebar, and one quiet column of photos.
The site should feel personal and handmade. Photos lead, in full color, at their real shape.

## Rules
- Background is kraft / cardboard (`--paper` #D9C6A5) with a fiber texture painted on the page. Aiden wants it warm and homey, "shoebox of prints".
- Photos sit straight on the paper: loose mixed sizes, NO borders, frames, tilts, tape, shadows or scrapbook touches (Aiden hated that).
- Never add grain, filters, or overlays on top of photos. Aiden's exports already have film grain.
- Never crop gallery photos, never dim them, never make them black and white.
- Fonts: EB Garamond (everything), Caveat Brush (wordmark), Caveat (handwritten captions). A custom font from Aiden is coming.
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
- Loose print placement is hand-tuned in the `WIDE`/`PAIR`/`WIDE_TALL`/`TALL` lists in `components/Feed.tsx`.
- `/home` redirects to `/` (old links).
