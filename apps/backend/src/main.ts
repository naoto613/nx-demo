import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { FindUsersUseCase } from './application/use-cases/users/find-users.use-case';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // console.log(process.env.BATCH)
  if (process.env.BATCH) {
    // console.log('どうだ')
    const findUsersUseCase = app.get(FindUsersUseCase);
    const users = findUsersUseCase.execute({searchInput:  null})
    console.log(users)
    await app.close();
  } else {
    await app.listen(3000);
  }
}
bootstrap();

// async function bootstrap() {
//   // const app = await NestFactory.create(AppModule);
//   const app = await NestFactory.createApplicationContext(AppModule);
//   // app.useGlobalPipes(new ValidationPipe({ transform: true }));
//   console.log('どうだ')
// }
// bootstrap();