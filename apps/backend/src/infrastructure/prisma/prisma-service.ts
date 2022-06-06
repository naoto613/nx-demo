import { PrismaService } from './prisma.service';
// import { PrismaClient } from '@prisma/client';

// PrismaClientのインスタンスを1回しか生成しないようにする
const prismaService = new PrismaService();
// seed実行時はこちらに切り替える
// const prismaService = new PrismaClient();

export default prismaService;
