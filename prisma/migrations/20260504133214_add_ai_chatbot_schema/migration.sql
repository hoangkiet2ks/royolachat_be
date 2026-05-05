-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isBot" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "BotModerator" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "enabledBy" INTEGER NOT NULL,
    "enabledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotModerator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRateLimit" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestCount" INTEGER NOT NULL DEFAULT 0,
    "windowStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiRateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BotModerator_conversationId_key" ON "BotModerator"("conversationId");

-- CreateIndex
CREATE UNIQUE INDEX "AiRateLimit_userId_key" ON "AiRateLimit"("userId");

-- AddForeignKey
ALTER TABLE "BotModerator" ADD CONSTRAINT "BotModerator_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
