/*
  Warnings:

  - The primary key for the `roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `roles` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `roles_on_users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `A` on the `_RoleToUser` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roleId` on the `roles_on_users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "roles_on_users" DROP CONSTRAINT "roles_on_users_roleId_fkey";

-- AlterTable
ALTER TABLE "_RoleToUser" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "roles" DROP CONSTRAINT "roles_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "roles_on_users" DROP CONSTRAINT "roles_on_users_pkey",
DROP COLUMN "roleId",
ADD COLUMN     "roleId" INTEGER NOT NULL,
ADD CONSTRAINT "roles_on_users_pkey" PRIMARY KEY ("userId", "roleId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "roles_on_users_roleId_idx" ON "roles_on_users"("roleId");

-- AddForeignKey
ALTER TABLE "roles_on_users" ADD CONSTRAINT "roles_on_users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
