# CLAUDE.md · Aiden Urbine

Photo & video for outdoor, lifestyle, and gear brands. Missoula, Montana.

## Direction (Sept 2026 redesign)
The old grey, template-y site felt like "no human had anything to do with it."
The reference is makaylacrist.com: warm cream paper, a handwritten wordmark,
small tracked serif caps down a left sidebar, and one quiet column of photos.
The site should feel personal and handmade. Photos lead, in full color, at their real shape.

## Rules
- Background is warm cream (`--paper`), never grey or pure white. One accent, rust (`--rust`), for hover and "you are here".
- Fonts: EB Garamond (everything), Caveat Brush (wordmark only), Caveat (small handwritten notes, sparingly).
- Never crop gallery photos, never dim them, never make them black and white. Portrait pairs sit side by side.
- No scroll-triggered fade-ins (they caused blank gaps on the old site). Photos show their average color while loading.
- No em dashes in site copy. Copy is first person, in Aiden's voice.
- No custom cursor.

## Where things live
- `lib/projects.ts`: all content. Projects, photo order, favorites feed, about-page prints, email/IG.
  Photos carry real `w`/`h` and an average color `c`. When adding photos, get these with Python/PIL
  (see the generator approach: `ImageOps.exif_transpose(Image.open(p)).size`, and a 1x1 resize for color).
- `components/Sidebar.tsx`: nav (collapses to a top bar + menu on phones).
- `components/Feed.tsx`: the photo column and full-screen viewer.
- `app/page.tsx` + `components/Landing.tsx`: full-screen landing slideshow (no sidebar). Photos = `LANDING` in lib/projects.ts.
- `app/(site)/`: everything with the sidebar. `work` = favorites feed, `work/[slug]` project pages, `about`, `contact` (mailto form).
- Landing name font is `--display` in globals.css (placeholder until Aiden picks a font).
- `/home` redirects to `/` (old links).
