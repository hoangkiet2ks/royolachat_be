import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const SmartReplySchema = z.object({
  messageContent: z.string().min(1).max(2000),
});

export const ToneEditSchema = z.object({
  text: z.string().min(5).max(2000),
  mode: z.enum(['polite', 'grammar']),
});

export class SmartReplyDto extends createZodDto(SmartReplySchema) {}
export class ToneEditDto extends createZodDto(ToneEditSchema) {}

export interface SmartReplyResponse {
  suggestions: string[];
  error?: string;
}

export interface ToneEditResponse {
  result: string;
  error?: string;
}
