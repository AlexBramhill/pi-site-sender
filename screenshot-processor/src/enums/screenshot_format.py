from enum import Enum


class ScreenshotFormat(str, Enum):
    png = "png"
    jpeg = "jpeg"
    bmp = "bmp"
    bmp_raw = "bmp_raw"
