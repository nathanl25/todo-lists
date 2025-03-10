import { z } from 'zod';
const reg = /(?:\s*[a-zA-Z]+\s)(?:\S+\s)*(?:\S+\s*)|\s*[a-zA-Z]+\s*/;
const regexMsg =
  'Name must start with a word, and words must have one space between them';

export const schema = z.object({
  name: z.string().min(1).max(80).regex(reg, {
    message: regexMsg,
  }),
});

export type TodoQuickFormData = z.infer<typeof schema>;
