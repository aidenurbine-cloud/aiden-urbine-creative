#!/usr/bin/env python3
"""
Import a client's collections from a folder of folders.

    python3 scripts/import-collections.py mkc "/path/to/MKC"

Source layout (one folder per collection; a leading number only sets the order):

    MKC/
      01 001s/          <- collection "001s"
        notes.txt       <- optional: one-line description
        cover.jpg       <- optional: the cover; otherwise the first photo
        a.jpg  b.jpg  unboxing.mp4 ...
      02 Unboxings/
      ...

Photos are resized to 3000px on the long edge (JPEG q82). Videos are converted to
H.264 MP4 (max 1920px on the long edge, audio kept) with a poster frame. Output goes to
public/images/<client>/<collection>/ and lib/collections/<client>.json.
Re-running skips files that were already converted.
"""
import json, os, re, subprocess, sys, urllib.parse
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
        im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
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


def main(client, source):
    source = Path(source).expanduser()
    folders = sorted(p for p in source.iterdir() if p.is_dir() and not p.name.startswith("."))
    if not folders:
        sys.exit(f"No collection folders in {source}")
    out = []
    for folder in folders:
        name = re.sub(r"^\d+[\s._-]+", "", folder.name).strip()
        slug = slugify(name)
        out_dir = ROOT / "public" / "images" / client / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        files = sorted(f for f in folder.iterdir() if f.suffix.lower() in PHOTO | VIDEO and not f.name.startswith("."))
        notes = next((folder / n for n in ("notes.txt", "description.txt") if (folder / n).exists()), None)
        desc = notes.read_text().strip() if notes else ""
        items, cover = [], None
        for i, f in enumerate(files, 1):
            print(f"  {name}: {f.name}")
            item = video(f, out_dir, i) if f.suffix.lower() in VIDEO else photo(f, out_dir, i)
            if f.stem.lower() == "cover" and item.get("type") != "video":
                cover = item
            else:
                items.append(item)
        if not items and not cover:
            print(f"  (skipping empty folder {folder.name})")
            continue
        if cover is None:
            stills = [m for m in items if m.get("type") != "video"]
            first = stills[0] if stills else items[0]
            cover = first if first.get("type") != "video" else {**first, "src": first["poster"]}
            cover = {k: cover[k] for k in ("src", "w", "h", "c")}
        out.append({"slug": slug, "name": name, "desc": desc, "cover": cover, "items": items})
        print(f"{name}: {len(items)} items")
    dst = ROOT / "lib" / "collections" / f"{client}.json"
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(json.dumps(out, indent=1))
    print(f"Wrote {dst.relative_to(ROOT)} ({len(out)} collections)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
