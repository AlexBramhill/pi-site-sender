import { ScreenColourProfile } from "../../schemas/screen/screen-colour-profile-schema.js";
import type { ScreenConfig } from "../../schemas/screen/screen-config-schema.js";
import { ScreenshotFormat } from "../../schemas/screenshot-format-schema.js";

export const WAVESHARE_37: ScreenConfig = {
    reference: "waveshare37",
    name: "Waveshare 3.7 EInk Screen",
    dimensions: { width: 480, height: 280 },
    supportedColourProfile: [ScreenColourProfile.one_bit, ScreenColourProfile.two_bit],
    supportedFormats: [ScreenshotFormat.bmp_raw]
}