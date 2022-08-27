import { UserModel } from '../../../domain/models/user.model';
import { Authority } from '../@generated/prisma/authority.enum';
import { UserCreateInput } from '../@generated/user/user-create.input';
import { createFactory } from './create-factory';

const defaultAttributes: UserCreateInput = {
  email: 'test@example.com',
  name: 'テスト 太郎',
  authority: Authority.FIRST,
};

export const userFactory = createFactory<UserCreateInput, UserModel>(
  'user',
  defaultAttributes,
);
