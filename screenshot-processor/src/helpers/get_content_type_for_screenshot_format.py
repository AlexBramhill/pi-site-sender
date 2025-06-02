from src.enums.screenshot_format import ScreenshotFormat


def get_content_type_for_screenshot_format(format: ScreenshotFormat) -> str:
    if format == ScreenshotFormat.bmp_raw:
        return "application/octet-stream"
    return f"image/{format.value}"
