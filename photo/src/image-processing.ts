import { Jimp, JimpMime } from "jimp";

const floydSteinberg = (image) => {
  var imageData = image.data;
  var imageDataLength = imageData.length;
  var w = image.width;
  var lumR = [],
    lumG = [],
    lumB = [];

  var newPixel, err;

  for (var i = 0; i < 256; i++) {
    lumR[i] = i * 0.299;
    lumG[i] = i * 0.587;
    lumB[i] = i * 0.11;
  }

  // Greyscale luminance (sets r pixels to luminance of rgb)
  for (var i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(
      lumR[imageData[i]] + lumG[imageData[i + 1]] + lumB[imageData[i + 2]]
    );
  }

  for (
    var currentPixel = 0;
    currentPixel <= imageDataLength;
    currentPixel += 4
  ) {
    // threshold for determining current pixel's conversion to a black or white pixel
    newPixel = imageData[currentPixel] < 150 ? 0 : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 23);
    imageData[currentPixel + 0 * 1 - 0] = newPixel;
    imageData[currentPixel + 4 * 1 - 0] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w - 0] += err * 5;
    imageData[currentPixel + 4 * w + 4] += err * 1;
    // Set g and b values equal to r (effectively greyscales the image fully)
    imageData[currentPixel + 1] = imageData[currentPixel + 2] =
      imageData[currentPixel];
  }

  return image;
};

const dither = async (image) => {
  image.greyscale();

  const { width, height } = image.bitmap;

  // Create error buffer for propagation
  const errorBuffer = new Array(width * height).fill(0);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      let oldPixel = image.bitmap.data[idx] + errorBuffer[idx];
      const newPixel = oldPixel > 128 ? 255 : 0;
      image.bitmap.data[idx] = newPixel;

      // Calculate and propagate quantization error
      const quantError = oldPixel - newPixel;
      if (x < width - 1) errorBuffer[idx + 1] += (quantError * 7) / 16;
      if (y < height - 1) {
        if (x > 0) errorBuffer[idx + width - 1] += (quantError * 3) / 16;
        errorBuffer[idx + width] += (quantError * 5) / 16;
        if (x < width - 1)
          errorBuffer[idx + width + 1] += (quantError * 1) / 16;
      }
    }
  }
};

export const processImage = async (imageBuffer: Buffer<ArrayBuffer>) => {
  const image = await Jimp.read(imageBuffer);
  await dither(image);

  return await image.getBuffer(JimpMime.png);
};
