-- CreateTable
CREATE TABLE "User" (
    "UserId" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "FlatNumber" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "ContactNumber" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Query" (
    "QueryId" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Status" BOOLEAN NOT NULL DEFAULT false,
    "InTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OutTime" TIMESTAMP(3) NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("QueryId")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "Id" TEXT NOT NULL,
    "Dues" INTEGER NOT NULL,
    "AccUserId" TEXT NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_AccUserId_key" ON "Accounts"("AccUserId");

-- AddForeignKey
ALTER TABLE "Query" ADD CONSTRAINT "Query_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_AccUserId_fkey" FOREIGN KEY ("AccUserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;
