import z from 'zod';
export declare const MessageResSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type MessageResType = z.infer<typeof MessageResSchema>;
