import { z } from "zod";
export const requestSchema = z
  .object({
    personal: z.object({
      name: z.string().trim().min(2).max(100),
      email: z.email().max(254),
      nationality: z.string().trim().min(2).max(80),
      phone: z.string().max(40).optional(),
    }),
    service: z.enum(["visa", "transfers", "medical", "vacations", "esim"]),
    purpose: z.enum(["Work", "Study", "Visitor", "Medical"]),
    package: z.string().max(100).optional(),
    details: z
      .record(z.string().max(40), z.string().max(500))
      .refine((v) => Object.keys(v).length <= 15),
    documents: z.array(z.string().min(1).max(200)).max(10),
  })
  .strict();
export type SavedRequest = z.infer<typeof requestSchema>;
