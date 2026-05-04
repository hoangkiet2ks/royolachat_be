"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
exports.isUniqueConstraintPrismaError = isUniqueConstraintPrismaError;
exports.isNotFoundPrismaError = isNotFoundPrismaError;
const client_1 = require("../generated/prisma/client");
const crypto_1 = require("crypto");
function isUniqueConstraintPrismaError(error) {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
}
function isNotFoundPrismaError(error) {
    return error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2025';
}
const generateOTP = () => {
    return String((0, crypto_1.randomInt)(100000, 1000000));
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=helper.js.map