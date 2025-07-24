import z from "zod";
import { ScreenColourProfileSchema } from "./screen/screen-colour-profile-schema.js";
import { ScreenReferenceSchema } from "./screen/screen-reference-schema.js";
import { ScreenshotFormatSchema } from "./screenshot-format-schema.js";
import { ScreenRotationSchema } from "./screen-rotation-schema.js";
import { ScreenDimensionsSchema } from "./screen/screen-dimensions.js";
import { BackendOrchestratorQuerySchema } from "./backend-orchestrator-query-schema.js";
import { ScreenConfigs } from "../config/screen/waveshare-37.js";

const BaseEnrichedBackendOrchestratorQuerySchema = z.object({
    screenReference: ScreenReferenceSchema,
    format: ScreenshotFormatSchema,
    rotation: ScreenRotationSchema,
    colour_profile: ScreenColourProfileSchema,
    dimensions: ScreenDimensionsSchema
});

type BaseEnrichedBackendOrchestratorQuery = z.infer<typeof BaseEnrichedBackendOrchestratorQuerySchema>;

export const EnrichedBackendOrchestratorQuerySchema = BackendOrchestratorQuerySchema.superRefine((data, ctx) => {
    const config = ScreenConfigs[data.screenReference];

    if (!config) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Unknown screenReference: ${data.screenReference}`,
            path: ["screenReference"],
        });
        return;
    }

    if (data.colour_profile && !config.supportedColourProfile.includes(data.colour_profile)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Colour profile '${data.colour_profile}' not supported by screenReference '${data.screenReference}'`,
            path: ["colour_profile"],
        });
    }

    if (data.format && !config.supportedFormats.includes(data.format)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Format '${data.format}' not supported by screenReference '${data.screenReference}'`,
            path: ["format"],
        });
    }
}).transform<BaseEnrichedBackendOrchestratorQuery>((data) => {
    const config = ScreenConfigs[data.screenReference]
    return {
        ...data,
        format: data.format ?? config.defaultFormat,
        colour_profile: data.colour_profile ?? config.defaultColourProfile,
        rotation: data.rotation ?? config.defaultRotation,
        dimensions: config.dimensions,
    };
});

export type EnrichedBackendOrchestratorQuery = z.infer<
    typeof EnrichedBackendOrchestratorQuerySchema
>;
