import prismaService from "./prisma-service";

import { PrismaPromise } from ".prisma/client";

export const resetTable = async (
): Promise<void> => {
  const transactions: PrismaPromise<any>[] = []
  transactions.push(prismaService.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`)

  const tableNames = await prismaService.$queryRaw<
    Array<{ tableName: string }>
  >`SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA = 'test_database';`

  for (const { tableName } of tableNames) {
    if (tableName !== '_prisma_migrations') {
      try {
        transactions.push(prismaService.$executeRawUnsafe(`TRUNCATE ${tableName};`))
      } catch (error) {
        console.log({ error })
      }
    }
  }

  transactions.push(prismaService.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`)

  try {
    await prismaService.$transaction(transactions)
  } catch (error) {
    console.log({ error })
  }
};