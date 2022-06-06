import { Module } from '@nestjs/common';
import { CreateUserUseCase } from '../../../../application/use-cases/users/create-user.use-case';
import { UsersRepositoryModule } from '../../../../infrastructure/ioc/repositories/users.repository.module';

@Module({
  imports: [UsersRepositoryModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class CreateUserUseCaseModule {}
