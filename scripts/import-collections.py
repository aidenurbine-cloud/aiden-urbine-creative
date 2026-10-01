#!/usr/bin/env python3
"""
Import a client's collections from a folder.

    python3 scripts/import-collections.py mkc ~/Desktop/"MKC Collections"

Layout. Top-level folders are categories (they become the filter on the client page).
A category holds either photos/videos directly, or one folder per shoot:

    MKC Collections/
      01 Field Work/                 <- category with shoots
        01 MKC x Maria Lovely/       <- a shoot (its own page)
        02 MKC Hellgate Hatchet/
      02 Apparel/                    <- category with photos directly (one page)
        a.jpg  b.jpg ...
      03 Unboxing Videos/            <- empty folders are skipped

A leading number only sets the order. Any folder may hold notes.txt (one-line
description) and cover.jpg (its cover; otherwise the first photo).

Photos: resized to 3000px long edge (JPEG q82); JPEGs already that size are copied
as is. Videos: H.264 MP4 (max 1920px long edge, audio kept) plus a poster frame.
Output: public/images/<client>/... and lib/collections/<client>.json.
Re-running skips files that were already converted.
"""
import json, os, re, shutil, subprocess, sys, urllib.parse
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
PHOTO = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}
VIDEO = {".mp4", ".mov", ".m4v"}
LONG_EDGE = 3000


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-") or "untitled"


def avg_color(im):
    r, g, b = im.convert("RGB").resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    return f"#{r:02x}{g:02x}{b:02x}"


def url(p):
    return "/" + urllib.parse.quote(str(p.relative_to(ROOT / "public")))


def photo(src, out_dir, i):
    dst = out_dir / f"{i:03d}-{slugify(src.stem)}.jpg"
    if not dst.exists():
        raw = Image.open(src)
        oriented = (raw.getexif().get(0x0112, 1) or 1) == 1
        if src.suffix.lower() in {".jpg", ".jpeg"} and max(raw.size) <= LONG_EDGE and oriented:
            shutil.copy2(src, dst)  # already web-sized, don't re-compress
        else:
            im = ImageOps.exif_transpose(raw).convert("RGB")
            im.thumbnail((LONG_EDGE, LONG_EDGE), Image.LANCZOS)
            im.save(dst, "JPEG", quality=82, optimize=True, progressive=True)
    im = Image.open(dst)
    return {"src": url(dst), "w": im.width, "h": im.height, "c": avg_color(im)}


def video(src, out_dir, i):
    base = f"{i:03d}-{slugify(src.stem)}"
    dst, poster = out_dir / f"{base}.mp4", out_dir / f"{base}.jpg"
    if not dst.exists():
        subprocess.run(
            ["ffmpeg", "-y", "-loglevel", "error", "-i", str(src),
             "-vf", "scale='if(gt(iw,ih),min(1920,iw),-2)':'if(gt(iw,ih),-2,min(1920,ih))'",
             "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p",
             "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", str(dst)],
            check=True,
        )
    if not poster.exists():
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-ss", "0.5", "-i", str(dst),
                        "-frames:v", "1", "-q:v", "3", str(poster)], check=True)
    im = Image.open(poster)
    return {"type": "video", "src": url(dst), "poster": url(poster), "w": im.width, "h": im.height, "c": avg_color(im)}


def clean(name):
    return re.sub(r"^\d+[\s._-]+", "", name).strip()


def subdirs(folder):
    return sorted(p for p in folder.iterdir() if p.is_dir() and not p.name.startswith("."))


def collection(folder, out_dir, slug_path):
    """One folder of photos/videos -> {slug, name, desc, cover, items}, or None if empty."""
    name = clean(folder.name)
    files = sorted(f for f in folder.iterdir() if f.suffix.lower() in PHOTO | VIDEO and not f.name.startswith("."))
    if files:
        out_dir.mkdir(parents=True, exist_ok=True)
    notes = next((folder / n for n in ("notes.txt", "description.txt") if (folder / n).exists()), None)
    items, cover = [], None
    for i, f in enumerate(files, 1):
        print(f"  {slug_path}: {f.name}")
        item = video(f, out_dir, i) if f.suffix.lower() in VIDEO else photo(f, out_dir, i)
        if f.stem.lower() == "cover" and item.get("type") != "video":
            cover = item
        else:
            items.append(item)
    if not items:
        return None
    if cover is None:
        stills = [m for m in items if m.get("type") != "video"]
        first = stills[0] if stills else {**items[0], "src": items[0]["poster"]}
        cover = {k: first[k] for k in ("src", "w", "h", "c")}
    return {"slug": slugify(name), "name": name, "desc": notes.read_text().strip() if notes else "", "cover": cover, "items": items}


def main(client, source):
    source = Path(source).expanduser()
    out = []
    for cat in subdirs(source):
        cslug = slugify(clean(cat.name))
        base = ROOT / "public" / "images" / client / cslug
        shoots = subdirs(cat)
        if shoots:
            found = [s for s in (collection(sh, base / slugify(clean(sh.name)), f"{cslug}/{slugify(clean(sh.name))}") for sh in shoots) if s]
            loose = [f for f in cat.iterdir() if f.suffix.lower() in PHOTO | VIDEO]
            if loose:
                print(f"  ! {cat.name}: {len(loose)} loose files ignored (this category uses shoot folders)")
            if not found:
                print(f"  (skipping {cat.name}: no shoots with files yet)")
                continue
            notes = cat / "notes.txt"
            out.append({"slug": cslug, "name": clean(cat.name), "desc": notes.read_text().strip() if notes.exists() else "",
                        "cover": found[0]["cover"], "items": [], "shoots": found})
            print(f"{clean(cat.name)}: {len(found)} shoots")
        else:
            c = collection(cat, base, cslug)
            if not c:
                print(f"  (skipping {cat.name}: empty)")
                continue
            out.append({**c, "shoots": []})
            print(f"{c['name']}: {len(c['items'])} items")
    dst = ROOT / "lib" / "collections" / f"{client}.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(out, indent=1))
    print(f"Wrote {dst.relative_to(ROOT)} ({len(out)} categories)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
