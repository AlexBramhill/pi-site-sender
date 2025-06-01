from fastapi import FastAPI, File, UploadFile, Query, HTTPException
from fastapi.responses import StreamingResponse
from PIL import Image

from converter import convert_image
from downsampler import downsample_image

app = FastAPI()


@app.post("/process-image/")
async def process_image(
    file: UploadFile = File(...),
    output_format: str = Query('PNG', regex="^(PNG|JPG|BMP)$", description="Output format: PNG, JPG, or BMP"),
    downsample_mode: str = Query('1bit', regex="^(1bit|4grey|rgb332)$", description="Downsample mode")
):
    try:
        image = Image.open(file.file)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid image file")

    try:
        processed_img = downsample_image(image, downsample_mode)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    buf = convert_image(processed_img, output_format)

    return StreamingResponse(buf, media_type=f"image/{output_format.lower()}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=4002)
