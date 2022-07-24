import { Test, TestingModule } from '@nestjs/testing';
import { Authority } from '@prisma/client';
import { UsersRepository } from '../../../src/application/repositories/users.repository';
import { UsersRepositoryModule } from '../../../src/infrastructure/ioc/repositories/users.repository.module';
import prismaService from '../../../src/infrastructure/prisma/prisma-service';
import { CreateOneUserArgs } from '../../../src/infrastructure/prisma/@generated/user/create-one-user.args';
import { userFactory } from '../../../src/infrastructure/prisma/factories/users.factory';
import { UserCreateInput } from '../../../src/infrastructure/prisma/@generated/user/user-create.input';
import { resetTable } from '../../../src/infrastructure/prisma/reset-table';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeEach(async () => {
    await resetTable();

    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepositoryModule],
    }).compile();

    repository = module.get<UsersRepository>(UsersRepository);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userCreateInput: CreateOneUserArgs = {
        data: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          authority: 'FIRST',
        },
      };
      // 実行
      await repository.create(userCreateInput);

      const savedUsers = await prismaService.user.findMany({
        where: { email: userCreateInput.data.email },
        take: 1,
      });

      expect(savedUsers[0].name).toBe(userCreateInput.data.name);
      expect(savedUsers[0].email).toBe(userCreateInput.data.email);
      expect(savedUsers[0].authority).toBe(userCreateInput.data.authority);
    });
  });

  describe('findMany', () => {
    const userData: Array<UserCreateInput> = [
      {
        name: 'テスト 一郎',
        email: 'test1@example.com',
        authority: Authority.FIRST,
      },
      {
        name: 'テスト 二郎',
        email: 'test2@example.com',
        authority: Authority.FIRST,
      },
      {
        name: '田中 三郎',
        email: 'tanaka3@example.com',
        authority: Authority.FIRST,
      },
      {
        name: '田中 四郎',
        email: 'tanaka4@example.com',
        authority: Authority.FIRST,
      },
      {
        name: '田中 五郎',
        email: 'tanaka5@example.com',
        authority: Authority.FIRST,
      },
      {
        name: '山本 六郎',
        email: 'yamamoto6@example.com',
        authority: Authority.THIRD,
      },
    ];

    beforeEach(async () => {
      for (const user of userData) {
        await userFactory.create(user);
      }
    });

    it('should get users by emails', async () => {
      const users = await repository.findMany({
        searchInput: { email: 'test' },
      });

      expect(users.length).toBe(2);
    });

    it('should get users by name', async () => {
      const users = await repository.findMany({
        searchInput: { name: '田中' },
      });

      expect(users.length).toBe(3);
    });

    it('should get users by authority', async () => {
      const users = await repository.findMany({
        searchInput: { authority: Authority.THIRD },
      });

      expect(users.length).toBe(1);
    });

    it('should get all users order by email', async () => {
      const users = await repository.findMany({
        searchInput: null,
      });

      expect(users[0].email).toBe(userData[2].email);
      expect(users[1].email).toBe(userData[3].email);
      expect(users[2].email).toBe(userData[4].email);
      expect(users[3].email).toBe(userData[0].email);
      expect(users[4].email).toBe(userData[1].email);
      expect(users[5].email).toBe(userData[5].email);
    });
  });
});
