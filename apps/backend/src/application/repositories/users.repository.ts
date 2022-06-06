import { UserModel } from "../../domain/models/user.model";
import { SearchUsersInput } from "../../dto/users/search-users.input";
import { CreateOneUserArgs } from "../../infrastructure/prisma/@generated/user/create-one-user.args";

export abstract class UsersRepository {
  abstract create(input: Readonly<CreateOneUserArgs>): Promise<UserModel>;
  abstract findMany(
    input: Readonly<SearchUsersInput>,
  ): Promise<UserModel[] | null>;
}
