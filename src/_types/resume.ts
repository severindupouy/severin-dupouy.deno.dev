import { FromSchema } from "npm:json-schema-to-ts";
import { resumeSchema } from "./resume.schema.ts";

export type Resume = FromSchema<typeof resumeSchema>;
