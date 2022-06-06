import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { CreateOneUserArgs } from '../../../infrastructure/prisma/@generated/user/create-one-user.args';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(input: Readonly<CreateOneUserArgs>): Promise<UserModel> {
    return this.repository.create(input);
  }
}
