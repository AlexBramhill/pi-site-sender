import { Jimp, JimpMime } from "jimp";

export const processImage = async (imageBuffer: Buffer<ArrayBuffer>) => {
  const image = await Jimp.read(imageBuffer);
  image.greyscale().dither();

  return await image.getBuffer(JimpMime.png);
};
