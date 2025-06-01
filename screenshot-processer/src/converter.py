import io
from PIL import Image


def convert_image (output_format: str, processed_img: Image.Image) -> io.BytesIO:
    buf = io.BytesIO()
    save_format = output_format.upper()

    if save_format == 'JPG':
        if processed_img.mode not in ['RGB', 'L']:
            processed_img = processed_img.convert('RGB')
        save_format = 'JPEG'

    processed_img.save(buf, format=save_format)
    buf.seek(0)
    return buf