import { z } from "zod";

export const auditUrlSchema = z.object({
  body: z.object({
    url: z
      .string()
      .min(1, "URL is required")
      .url("Must be a valid HTTP or HTTPS URL")
      .refine(
        (val) =>
          val.startsWith("http://") || val.startsWith("https://"),
        {
          message: "URL must start with http:// or https://",
        }
      ),
  }),
});