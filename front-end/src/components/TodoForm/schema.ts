import { z } from 'zod';
const reg = /(?:\s*[a-zA-Z]+\s)(?:\S+\s)*(?:\S+\s*)|\s*[a-zA-Z]+\s*/;
const regexMsg =
  'Name must start with a word, and words must have one space between them';
export const status = [
  'NOT_STARTED',
  'IN_PROGRESS',
  'COMPLETE',
  'OVERDUE',
] as const;
export const schema = z.object({
  name: z.string().min(1).max(80).regex(reg, {
    message: regexMsg,
  }),
  description: z
    .string()
    .min(1)
    .max(255)
    .regex(reg, {
      message: regexMsg,
    })
    .optional()
    .or(z.literal('').transform(() => undefined)),
  category: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        id: z.number(),
      })
    )
    .optional(),
  dueDate: z
    .string()
    .transform((time) => (time === '' ? undefined : new Date(time)))
    // .refine((val) => new Date(val))

    // .datetime({ local: true, message: 'this is some shit' })
    .optional(),
  status: z.enum(status).or(z.literal('').transform(() => undefined)),
  // .or(z.literal('').transform(() => undefined)),
});

export type FormData = z.infer<typeof schema>;
