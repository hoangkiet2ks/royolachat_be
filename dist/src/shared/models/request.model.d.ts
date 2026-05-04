import z from 'zod';
export declare const EmptyBodySchema: z.ZodObject<{}, z.core.$strict>;
export type EmptyBodyType = z.infer<typeof EmptyBodySchema>;
