from fastapi import FastAPI, File, UploadFile, Query, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image

from src.enums.downsample_mode import DownsampleMode

from src.converter import convert_image
from src.downsampler import downsample_image

app = FastAPI()


@app.post("/")
async def process_image(
    file: UploadFile = File(...),
    format: str = Query('png', regex="^(png|jpeg|bmp)$",
                        description="Output format: PNG, JPG, or BMP"),

):
    downsample_mode = DownsampleMode.ONE_BIT
    try:
        image = Image.open(file.file)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    try:
        processed_img = downsample_image(image, downsample_mode)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    buf = convert_image(format, processed_img)

    return StreamingResponse(buf, media_type=f"image/{format.lower()}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=4002)
