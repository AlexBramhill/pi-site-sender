import { ScreenColourProfile } from "../../schemas/screen/screen-colour-profile-schema.js";
import type { ScreenConfig } from "../../schemas/screen/screen-config-schema.js";
import { ScreenReference } from "../../schemas/screen/screen-reference-schema.js";
import { ScreenshotFormat } from "../../schemas/screenshot-format-schema.js";

export const ScreenConfigs: Record<ScreenReference, ScreenConfig> = {
    [ScreenReference.waveshare_37]: {
        name: "Waveshare 3.7 EInk Screen",
        dimensions: { width: 480, height: 280 },
        supportedColourProfile: [ScreenColourProfile.one_bit, ScreenColourProfile.two_bit],
        defaultColourProfile: ScreenColourProfile.one_bit,
        supportedFormats: [ScreenshotFormat.bmp_raw],
        defaultFormat: ScreenshotFormat.bmp_raw,
        defaultRotation: 0,
    }
};