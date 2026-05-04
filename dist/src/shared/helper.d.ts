import { Prisma } from '@/generated/prisma/client';
export declare function isUniqueConstraintPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError;
export declare function isNotFoundPrismaError(error: any): error is Prisma.PrismaClientKnownRequestError;
export declare const generateOTP: () => string;
