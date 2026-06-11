#!/usr/bin/env python3
"""Generate og-default.png (1200x630) for every site from its config.ts title.
Run: python3 generate-og.py  (requires Pillow)"""
import glob, os, re
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.dirname(os.path.abspath(__file__))
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
W, H, MARGIN = 1200, 630, 80
BG = (15, 23, 42)        # slate-900
WHITE = (255, 255, 255)
BLUE = (96, 165, 250)    # blue-400
GRAY = (148, 163, 184)   # slate-400
ACCENT = (37, 99, 235)   # blue-600


def parse(cfg):
    title = re.search(r"title: '((?:[^'\\]|\\.)*)'", cfg).group(1).replace("\\'", "'")
    prod = re.search(r"product:\s*\{\s*\n?\s*name: '([^']+)'", cfg)
    return title, (prod.group(1) if prod else "Sales.co")


def wrap(draw, text, font, max_w):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            line = trial
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


for cfg_path in sorted(glob.glob(f"{BASE}/*/src/config.ts")):
    site_dir = cfg_path.split("/src/")[0]
    domain = os.path.basename(site_dir)
    with open(cfg_path) as f:
        title, product = parse(f.read())

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 10], fill=ACCENT)

    size = 80
    while size > 40:
        font = ImageFont.truetype(FONT_BOLD, size)
        lines = wrap(d, title, font, W - 2 * MARGIN)
        if len(lines) <= 3:
            break
        size -= 6
    line_h = size * 1.18
    block_h = len(lines) * line_h
    y = (H - block_h) / 2 - 40
    for ln in lines:
        d.text((MARGIN, y), ln, font=font, fill=WHITE)
        y += line_h

    small = ImageFont.truetype(FONT_BOLD, 30)
    d.text((MARGIN, H - 110), domain, font=small, fill=BLUE)
    d.text((MARGIN, H - 64), f"Free resource by {product}", font=small, fill=GRAY)

    out = f"{site_dir}/public/og-default.png"
    img.save(out, "PNG")
    print(f"{domain}: {len(lines)} lines @ {size}px -> {os.path.getsize(out)//1024}KB")
