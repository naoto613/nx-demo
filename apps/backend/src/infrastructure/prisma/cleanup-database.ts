import prismaService from "./prisma-service";

/**
 * 全てのテーブルのデータを削除する
 */
export const cleanupDatabase = async (): Promise<void> => {
  // relationを加味して順番に削除
  await prismaService.user.deleteMany();

  prismaService.$disconnect();
};
