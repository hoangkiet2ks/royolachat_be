import { z } from 'zod';
export declare const SmartReplySchema: z.ZodObject<{
    messageContent: z.ZodString;
}, z.core.$strip>;
export declare const ToneEditSchema: z.ZodObject<{
    text: z.ZodString;
    mode: z.ZodEnum<{
        grammar: "grammar";
        polite: "polite";
    }>;
}, z.core.$strip>;
declare const SmartReplyDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    messageContent: z.ZodString;
}, z.core.$strip>, false>;
export declare class SmartReplyDto extends SmartReplyDto_base {
}
declare const ToneEditDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    text: z.ZodString;
    mode: z.ZodEnum<{
        grammar: "grammar";
        polite: "polite";
    }>;
}, z.core.$strip>, false>;
export declare class ToneEditDto extends ToneEditDto_base {
}
export interface SmartReplyResponse {
    suggestions: string[];
    error?: string;
}
export interface ToneEditResponse {
    result: string;
    error?: string;
}
export {};
