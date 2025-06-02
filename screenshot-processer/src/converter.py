import io
from PIL import Image
from src.enums.screenshot_format import ScreenshotFormat


def convert_image(output_format: ScreenshotFormat, processed_img: Image.Image) -> io.BytesIO:
    buf = io.BytesIO()
    pil_format_map = {
        ScreenshotFormat.jpeg: "JPEG",
        ScreenshotFormat.png: "PNG",
        ScreenshotFormat.bmp: "BMP",
    }

    if output_format == ScreenshotFormat.jpeg:
        if processed_img.mode not in ['RGB', 'L']:
            processed_img = processed_img.convert('RGB')

    if output_format == ScreenshotFormat.bmp or output_format == ScreenshotFormat.bmp_raw:
        if processed_img.mode not in ['1', 'L', 'RGB']:
            processed_img = processed_img.convert('RGB')

    if output_format == ScreenshotFormat.bmp_raw:
        raw_bytes = processed_img.tobytes()
        return io.BytesIO(raw_bytes)

    processed_img.save(buf, format=pil_format_map[output_format])
    buf.seek(0)
    return buf
