import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { CreateOneUserArgs } from '../../src/infrastructure/prisma/@generated/user/create-one-user.args';
import { UserCreateInput } from '../../src/infrastructure/prisma/@generated/user/user-create.input';

describe('CreateOneUserArgs', () => {
  describe('validation', () => {
    it('validate DTO', async () => {
      const target: ValidationPipe = new ValidationPipe({
        transform: true,
      });
      const testObj = {
        data: {
          email: 'test',
          name: 'テスト 太郎',
          age: 3,
        },
      };

      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: CreateOneUserArgs,
        data: '',
      };
      await target.transform(testObj, metadata).catch((err) => {
        expect(err.getResponse().message).toEqual([
          'data.email must be an email',
        ]);
      });
    });

    it('validate DTO', async () => {
      const target: ValidationPipe = new ValidationPipe({
        transform: true,
      });
      const testObj = {
        email: 'test',
        name: 'テスト 太郎',
        age: 3,
      };

      const metadata: ArgumentMetadata = {
        type: 'body',
        metatype: UserCreateInput,
        data: '',
      };
      await target.transform(testObj, metadata).catch((err) => {
        expect(err.getResponse().message).toEqual(['email must be an email']);
      });
    });
  });
});
