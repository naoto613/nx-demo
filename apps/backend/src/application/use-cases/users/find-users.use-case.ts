import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../domain/models/user.model';
import { SearchUsersInput } from '../../../dto/users/search-users.input';
import { UsersRepository } from '../../repositories/users.repository';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly repository: UsersRepository) {}

  async execute(
    input: Readonly<SearchUsersInput>,
  ): Promise<UserModel[] | null> {
    return this.repository.findMany(input);
  }
}
