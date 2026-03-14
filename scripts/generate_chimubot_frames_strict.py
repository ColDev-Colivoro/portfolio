from pathlib import Path
from PIL import Image
import math

ROOT = Path(r"c:\Users\the_8\Desktop\PERFIL JOSE COLIVORO URIBE -COLDEV, DESARROLLADOR\portfolio\portfolio")
SOURCE = ROOT / "public" / "images" / "chimubot" / "3 angulos de chimubot definitivo.png"
OUT_DIR = ROOT / "public" / "images" / "chimubot" / "frames" / "idle"

FRAME_COUNT = 30
TARGET = (1024, 1024)


def alpha_bbox(img: Image.Image):
    alpha = img.getchannel("A")
    bbox = alpha.getbbox()
    return bbox


def visible_pixels(img: Image.Image):
    hist = img.getchannel("A").histogram()
    return sum(hist[1:])


def extract_angle(source: Image.Image, idx: int):
    w, h = source.size
    sw = w // 3
    angle = source.crop((idx * sw, 0, (idx + 1) * sw, h)).convert("RGBA")
    bbox = alpha_bbox(angle)
    if not bbox:
        raise RuntimeError(f"Ángulo {idx} sin pixeles visibles")
    return angle.crop(bbox)


def detect_regions(sprite: Image.Image):
    bbox = alpha_bbox(sprite)
    if not bbox:
        raise RuntimeError("Sprite base inválido")

    sx1, sy1, sx2, sy2 = bbox
    sw = sx2 - sx1
    sh = sy2 - sy1

    # Detecta ojos por componentes conectados de brillo naranja en la zona superior de la cabeza.
    pix = sprite.load()
    max_y = sy1 + int(sh * 0.34)
    mask = set()
    for yy in range(sy1, max_y):
        for xx in range(sx1, sx2):
            r, g, b, a = pix[xx, yy]
            is_eye_glow = a > 0 and r > 150 and g > 70 and b < 95 and (r - g) > 25
            if is_eye_glow:
                mask.add((xx, yy))

    components = []
    visited = set()
    for pt in mask:
        if pt in visited:
            continue
        stack = [pt]
        visited.add(pt)
        comp = []
        while stack:
            cx, cy = stack.pop()
            comp.append((cx, cy))
            for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                np = (nx, ny)
                if np in mask and np not in visited:
                    visited.add(np)
                    stack.append(np)
        if len(comp) >= 10:
            components.append(comp)

    components.sort(key=len, reverse=True)
    candidates = components[:6]
    mid_x = sx1 + (sw // 2)

    def comp_box(comp):
        xs = [p[0] for p in comp]
        ys = [p[1] for p in comp]
        pad_x = max(2, int(sw * 0.010))
        pad_y = max(2, int(sh * 0.006))
        return (
            max(sx1, min(xs) - pad_x),
            max(sy1, min(ys) - pad_y),
            min(sx2, max(xs) + pad_x),
            min(max_y, max(ys) + pad_y),
        )

    left_boxes = []
    right_boxes = []
    for comp in candidates:
        xs = [p[0] for p in comp]
        cx = sum(xs) / len(xs)
        box = comp_box(comp)
        if cx < mid_x:
            left_boxes.append(box)
        else:
            right_boxes.append(box)

    def merge_boxes(boxes, fallba
    ck):
        if not boxes:
            return fallback
        x1 = min(b[0] for b in boxes)
        y1 = min(b[1] for b in boxes)
        x2 = max(b[2] for b in boxes)
        y2 = max(b[3] for b in boxes)
        if x2 <= x1 or y2 <= y1:
            return fallback
        return (x1, y1, x2, y2)

    left_fallback = (
        sx1 + int(sw * 0.36),
        sy1 + int(sh * 0.19),
        sx1 + int(sw * 0.45),
        sy1 + int(sh * 0.24),
    )
    right_fallback = (
        sx1 + int(sw * 0.55),
        sy1 + int(sh * 0.19),
        sx1 + int(sw * 0.64),
        sy1 + int(sh * 0.24),
    )

    left_eye_box = merge_boxes(left_boxes[:2], left_fallback)
    right_eye_box = merge_boxes(right_boxes[:2], right_fallback)

    right_search = (
        sx1 + int(sw * 0.62),
        sy1 + int(sh * 0.34),
        sx2,
        sy1 + int(sh * 0.96),
    )
    left_search = (
        sx1,
        sy1 + int(sh * 0.34),
        sx1 + int(sw * 0.38),
        sy1 + int(sh * 0.96),
    )

    def crop_alpha_bbox(search_box):
        sub = sprite.crop(search_box)
        sub_bbox = sub.getchannel("A").getbbox()
        if not sub_bbox:
            return None
        return (
            search_box[0] + sub_bbox[0],
            search_box[1] + sub_bbox[1],
            search_box[0] + sub_bbox[2],
            search_box[1] + sub_bbox[3],
        )

    tail_box = crop_alpha_bbox(right_search) or crop_alpha_bbox(left_search)
    if not tail_box:
        tail_box = right_search

    return (left_eye_box, right_eye_box), tail_box


def blink_level(frame_idx: int):
    # Blink principal muy visible: cierre y retención 2 frames.
    strong = {
        8: 0.25,
        9: 0.65,
        10: 1.00,
        11: 1.00,
        12: 0.65,
        13: 0.25,
    }
    # Blink secundario corto.
    soft = {
        22: 0.30,
        23: 0.80,
        24: 0.80,
        25: 0.30,
    }
    return max(strong.get(frame_idx, 0.0), soft.get(frame_idx, 0.0))


def apply_blink(sprite: Image.Image, eye_boxes, level: float):
    if level <= 0.001:
        return sprite.copy()

    out = sprite.copy()

    for eye_box in eye_boxes:
        x1, y1, x2, y2 = eye_box
        if x2 <= x1 or y2 <= y1:
            continue

        eyes = out.crop((x1, y1, x2, y2))
        eye_w, eye_h = eyes.size

        # Blink limpio: reduce brillo y colapsa verticalmente SOLO dentro de cada ojo.
        collapse = max(1, int(round(eye_h * (1.0 - 0.82 * level))))
        collapsed = eyes.resize((eye_w, collapse), Image.Resampling.BICUBIC)
        clear = Image.new("RGBA", (eye_w, eye_h), (0, 0, 0, 0))
        out.alpha_composite(clear, (x1, y1))
        paste_y = y1 + ((eye_h - collapse) // 2)
        out.alpha_composite(collapsed, (x1, paste_y))

        region = out.crop((x1, y1, x2, y2))
        px = region.load()
        dim = max(0.01, 1.0 - (0.995 * level))
        for yy in range(region.height):
            for xx in range(region.width):
                r, g, b, a = px[xx, yy]
                is_eye_glow = (r > 150 and g > 70 and b < 95 and a > 0)
                if is_eye_glow:
                    px[xx, yy] = (int(r * dim), int(g * dim), int(b * dim), a)
        out.alpha_composite(region, (x1, y1))

    return out


def apply_tail_swing(sprite: Image.Image, tail_box, frame_idx: int):
    x1, y1, x2, y2 = tail_box
    if x2 <= x1 or y2 <= y1:
        return sprite.copy()

    out = sprite.copy()
    tail = sprite.crop((x1, y1, x2, y2))
    tw, th = tail.size

    phase = (frame_idx / FRAME_COUNT) * (2 * math.pi)
    shear = math.sin(phase) * 0.07
    anchor_y = int(th * 0.12)

    # Warping anclado: base casi fija, punta con más desplazamiento
    warped = tail.transform(
        (tw, th),
        Image.Transform.AFFINE,
        (1.0, shear, -shear * anchor_y, 0.0, 1.0, 0.0),
        resample=Image.Resampling.BICUBIC,
    )

    # Mezcla suave para evitar saltos entre frames.
    warped_px = warped.load()
    tail_px = tail.load()
    blend = 0.55
    for yy in range(th):
        for xx in range(tw):
            wr, wg, wb, wa = warped_px[xx, yy]
            tr, tg, tb, ta = tail_px[xx, yy]
            if wa == 0 and ta == 0:
                continue
            ar = int((tr * (1.0 - blend)) + (wr * blend))
            ag = int((tg * (1.0 - blend)) + (wg * blend))
            ab = int((tb * (1.0 - blend)) + (wb * blend))
            aa = max(ta, wa)
            warped_px[xx, yy] = (ar, ag, ab, aa)

    out.alpha_composite(warped, (x1, y1))
    return out


def frame_from_sprite(sprite: Image.Image, frame_idx: int):
    # Micro-movimiento global sin recortar contenido
    bob_x = int(round(math.sin((frame_idx / FRAME_COUNT) * 2 * math.pi) * 3))
    bob_y = int(round(math.sin((frame_idx / FRAME_COUNT) * 4 * math.pi) * 2))

    # Ligero escalado respiración
    scale = 1.0 + (math.sin((frame_idx / FRAME_COUNT) * 2 * math.pi) * 0.01)
    nw = int(sprite.width * scale)
    nh = int(sprite.height * scale)
    resized = sprite.resize((nw, nh), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", TARGET, (0, 0, 0, 0))
    x = (TARGET[0] - nw) // 2 + bob_x
    y = TARGET[1] - nh - 8 + bob_y
    canvas.alpha_composite(resized, (x, y))
    return canvas


def smooth_problem_frames(frames):
    if len(frames) < 3:
        return frames

    # Reparación puntual de secuencia: transiciones que tienden a no calzar por la cola.
    repair_indices = [16, 20]
    out = [f.copy() for f in frames]
    for idx in repair_indices:
        prev_f = frames[(idx - 1) % len(frames)]
        curr_f = frames[idx]
        next_f = frames[(idx + 1) % len(frames)]
        neighbors = Image.blend(prev_f, next_f, 0.5)
        repaired = Image.blend(neighbors, curr_f, 0.30)
        out[idx] = repaired
        print(f"REPAIR frame {idx:02d}  using temporal blend")
    return out


def validate_frame(base_visible_pixels: int, frame: Image.Image, idx: int):
    bbox = alpha_bbox(frame)
    if not bbox:
        raise RuntimeError(f"Frame {idx:02d} inválido: sin contenido visible")

    visible = visible_pixels(frame)
    ratio = visible / max(1, base_visible_pixels)

    # Debe mantener prácticamente todo el contenido real del sprite
    if ratio < 0.94:
        raise RuntimeError(f"Frame {idx:02d} inválido: contenido insuficiente ({ratio:.3f})")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for f in OUT_DIR.glob("*.png"):
        f.unlink()

    src = Image.open(SOURCE).convert("RGBA")

    # Base principal (ángulo frontal) y regiones animables
    center = extract_angle(src, 1)
    eye_boxes, tail_box = detect_regions(center)

    # Base visible en canvas para umbral
    base_canvas = frame_from_sprite(center, 0)
    base_visible = visible_pixels(base_canvas)

    generated = []
    for i in range(FRAME_COUNT):
        blink = blink_level(i)
        with_tail = apply_tail_swing(center, tail_box, i)
        animated = apply_blink(with_tail, eye_boxes, blink)

        frame = frame_from_sprite(animated, i)
        generated.append(frame)
    final_frames = generated

    for i, frame in enumerate(final_frames):
        validate_frame(base_visible, frame, i)
        out = OUT_DIR / f"idle-r-{i:02d}.png"
        frame.save(out, optimize=True)

    print(f"Generados {FRAME_COUNT} frames válidos en {OUT_DIR}")


if __name__ == "__main__":
    main()
