from PIL import Image

from src.enums.downsample_mode import DownsampleMode


def downsample_image(img: Image.Image, mode: DownsampleMode) -> Image.Image:
    if mode == DownsampleMode.ONE_BIT:
        return img.convert('1', dither=Image.Dither.NONE)

    elif mode == DownsampleMode.TWO_BIT:
        # 2-bit grayscale (4 levels)
        grey = img.convert('L')

        def quantize_2bit(x):
            # Map 0-255 to 4 levels: 0, 85, 170, 255
            return int(x / 85) * 85
        return grey.point(quantize_2bit)

    elif mode == DownsampleMode.FOUR_BIT_PALETTE:
        # 4-bit palette: 16 colors
        # Use PIL quantize to reduce to 16 colors
        return img.convert('P', palette=Image.Palette.ADAPTIVE, colors=16)

    elif mode == DownsampleMode.EIGHT_BIT_PALETTE:
        # 8-bit palette: 256 colors
        return img.convert('P', palette=Image.Palette.ADAPTIVE, colors=256)

    elif mode == DownsampleMode.RGB332:
        rgb = img.convert('RGB')
        # Create RGB332 palette (256 colors)
        palette = []
        for i in range(256):
            r = ((i >> 5) & 0x07) * 255 // 7
            g = ((i >> 2) & 0x07) * 255 // 7
            b = (i & 0x03) * 255 // 3
            palette.extend([r, g, b])

        img_p = Image.new('P', rgb.size)
        img_p.putpalette(palette)
        pixels = [((r >> 5) << 5) | ((g >> 5) << 2) | (b >> 6)
                  for r, g, b in rgb.getdata()]
        img_p.putdata(pixels)
        return img_p

    elif mode == DownsampleMode.RGB565:
        rgb = img.convert('RGB')
        # RGB565: 5 bits red, 6 bits green, 5 bits blue
        pixels = []
        for r, g, b in rgb.getdata():
            r5 = (r >> 3) & 0x1F
            g6 = (g >> 2) & 0x3F
            b5 = (b >> 3) & 0x1F
            # Reconstruct 16-bit packed value if needed or reconstruct RGB888 approximation
            # Here we will reconstruct an RGB image approximated from RGB565
            r_new = (r5 << 3) | (r5 >> 2)
            g_new = (g6 << 2) | (g6 >> 4)
            b_new = (b5 << 3) | (b5 >> 2)
            pixels.append((r_new, g_new, b_new))

        img565 = Image.new('RGB', rgb.size)
        img565.putdata(pixels)
        return img565

    elif mode == DownsampleMode.RGB888:
        # Full 24-bit RGB, just ensure RGB mode
        return img.convert('RGB')

    else:
        raise ValueError(f"Unsupported downsample mode: {mode}")
