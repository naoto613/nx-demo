import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserUseCase } from '../../../src/application/use-cases/users/create-user.use-case';
import { UsersRepository } from '../../../src/application/repositories/users.repository';
import { UsersRepositoryModule } from '../../../src/infrastructure/ioc/repositories/users.repository.module';
import { CreateOneUserArgs } from '../../../src/infrastructure/prisma/@generated/user/create-one-user.args';
import { UserModel } from '../../../src/domain/models/user.model';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepositoryModule],
      providers: [CreateUserUseCase],
    }).compile();

    useCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const input: CreateOneUserArgs = {
        data: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          authority: 'FIRST',
          createdAt: '2022-04-01 15:08:09.703',
          updatedAt: '2022-04-01 15:08:09.703',
        },
      };
      const output: UserModel = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        authority: 'FIRST',
        hashedRefreshToken: null,
        age: null,
        createdAt: new Date('2022-04-01 15:08:09.703'),
        updatedAt: new Date('2022-04-01 15:08:09.703'),
      };
      const mock = jest
        .spyOn(repository, 'create')
        .mockImplementation(() => Promise.resolve(output));
      const newUser = await useCase.execute(input);
      // mockがInputで呼び出されている
      expect(mock).toHaveBeenCalledWith(input);
      // useCaseの返り値を確認
      expect(newUser).toMatchObject(output);
    });
  });
});
