import { Test, TestingModule } from '@nestjs/testing';
import { FindUsersUseCase } from '../../../src/application/use-cases/users/find-users.use-case';
import { UsersRepository } from '../../../src/application/repositories/users.repository';
import { UsersRepositoryModule } from '../../../src/infrastructure/ioc/repositories/users.repository.module';
import { SearchUsersInput } from '../../../src/dto/users/search-users.input';
import { UserModel } from '../../../src/domain/models/user.model';

describe('FindUsersUseCase', () => {
  let useCase: FindUsersUseCase;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersRepositoryModule],
      providers: [FindUsersUseCase],
    }).compile();

    useCase = module.get<FindUsersUseCase>(FindUsersUseCase);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  describe('createUser', () => {
    it('should get users', async () => {
      const input: SearchUsersInput = {
        searchInput: {
          name: 'John Doe',
          email: 'john.doe@email.com',
          authority: 'FIRST',
        },
        take: 5,
        skip: 0,
      };
      const output: UserModel[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@email.com',
          authority: 'FIRST',
          hashedRefreshToken: null,
          age: null,
          createdAt: new Date('2022-04-01 15:08:09.703'),
          updatedAt: new Date('2022-04-01 15:08:09.703'),
        },
      ];
      const mock = jest
        .spyOn(repository, 'findMany')
        .mockImplementation(() => Promise.resolve(output));
      const users = await useCase.execute(input);
      // mockがInputで呼び出されている
      expect(mock).toHaveBeenCalledWith(input);
      // useCaseの返り値を確認
      expect(users).toMatchObject(output);
    });
  });
});
