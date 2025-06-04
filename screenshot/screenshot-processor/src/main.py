from fastapi import FastAPI, File, UploadFile, Query, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image

from src.enums.downsample_mode import DownsampleMode
from src.enums.screenshot_format import ScreenshotFormat
from src.helpers.get_content_type_for_screenshot_format import get_content_type_for_screenshot_format
from src.converter import convert_image
from src.downsampler import downsample_image

app = FastAPI()


@app.post("/")
async def process_image(
    file: UploadFile = File(...),
    format: ScreenshotFormat = Query(default=ScreenshotFormat.png),
    rotation: int = Query(default=0, enum=[0, 90, 180, 270]),
):
    print("Processing image to format:", format)
    downsample_mode = DownsampleMode.ONE_BIT

    try:
        image = Image.open(file.file)
        image.verify()
    except Exception as e:
        print(f"Exception occurred while opening/verifying image: {e}")
        raise HTTPException(status_code=400, detail="Invalid image file")

    file.file.seek(0)
    image = Image.open(file.file)

    # Apply rotation if specified
    if rotation in [0, 90, 180, 270]:
        if rotation != 0:
            image = image.rotate(-rotation, expand=True)
    else:
        raise HTTPException(status_code=400, detail="Invalid rotation value")

    try:
        processed_img = downsample_image(image, downsample_mode)
    except Exception as e:
        print(f"Exception occurred during image processing: {e}")
        raise HTTPException(status_code=400, detail=str(e))

    try:
        buf = convert_image(format, processed_img)
    except Exception as e:
        print(f"Exception occurred during image conversion: {e}")
        raise HTTPException(status_code=500, detail="Error converting image")

    return StreamingResponse(buf, media_type=get_content_type_for_screenshot_format(format))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=4002)
