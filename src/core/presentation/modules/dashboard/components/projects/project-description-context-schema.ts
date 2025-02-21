import { z } from 'zod';

export const ProjectDescriptionContextSchema = z.object({
  projectDescriptionContext: z.string(),
});
