import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Authority } from '@prisma/client';
import { resetTable } from '../../src/infrastructure/prisma/reset-table';
import { AppModule } from '../../src/app.module';
import { UserCreateInput } from '../../src/infrastructure/prisma/@generated/user/user-create.input';
import { userFactory } from '../../src/infrastructure/prisma/factories/users.factory';
import { GraphQLErrorOutput } from '../../src/dto/errors/graphql-error.output';
import { GraphQLErrorExtensions } from '../../src/dto/errors/graphql-error-extensions';

describe('Users', () => {
  let app: INestApplication;

  beforeEach(async () => {
    await resetTable();
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('users', () => {
    it('should get users', async () => {
      const userData: Array<UserCreateInput> = [
        {
          name: 'テスト 一郎',
          email: 'test1@example.com',
          authority: Authority.FIRST,
        },
        {
          name: 'テスト 二郎',
          email: 'test2@example.com',
          authority: Authority.SECOND,
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
      ];

      for (const user of userData) {
        await userFactory.create(user);
      }

      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              query {
                users (
                  searchInput: {
                    email: "test"
                  }
                ) 
                {
                  email
                  name
                  authority
                }
              }
            `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.users).toEqual([
            {
              email: userData[0].email,
              name: userData[0].name,
              authority: userData[0].authority,
            },
            {
              email: userData[1].email,
              name: userData[1].name,
              authority: userData[1].authority,
            },
          ]);
        });
    });
  });

  describe('createUser', () => {
    describe('returned successfully', () => {
      it('should create a new user', () => {
        const user: UserCreateInput = {
          email: 'test1@example.com',
          name: 'テスト 一郎',
          authority: Authority.SECOND,
          age: 20,
        };

        return request(app.getHttpServer())
          .post('/graphql')
          .send({
            query: `
            mutation {
              createUser(
                data: {
                    email: "${user.email}",
                    name: "${user.name}",
                    authority: ${user.authority},
                    age: ${user.age}
                }
              ) 
              {
                email
                name
                authority
                age
              }
            }
          `,
          })
          .expect(200)
          .expect((res) => {
            expect(res.body.data.createUser).toEqual({
              email: user.email,
              name: user.name,
              authority: user.authority,
              age: user.age,
            });
          });
      });
    });
  });

  describe('validation pipe', () => {
    function getQuery(user: UserCreateInput) {
      return {
        query: `
        mutation {
          createUser(
            data: {
                email: "${user.email}",
                name: "${user.name}",
                authority: ${user.authority},
                age: ${user.age}
            }
          ) 
          {
            email
          }
        }
      `,
      };
    }

    const defaultEmail = 'test@email.com';
    const defaultName = 'テスト 一郎';
    const defaultAuthority = Authority.SECOND;
    const defaultAge = 20;

    it('when email is not an email format, an error will occur', () => {
      const user: UserCreateInput = {
        email: 'test',
        name: defaultName,
        authority: defaultAuthority,
        age: defaultAge,
      };

      return request(app.getHttpServer())
        .post('/graphql')
        .send(getQuery(user))
        .expect(200)
        .expect((res) => {
          const jsonResponse: GraphQLErrorOutput = JSON.parse(res.text);
          const errorExtensions: GraphQLErrorExtensions =
            jsonResponse.errors[0].extensions;

          expect(errorExtensions.code).toEqual('BAD_USER_INPUT');
          expect(errorExtensions.response.error).toEqual('Bad Request');
          expect(errorExtensions.response.message).toEqual([
            'data.email must be an email',
          ]);
          expect(errorExtensions.response.statusCode).toEqual(400);
        });
    });

    it('when name is empty, an error will occur', () => {
      const user: UserCreateInput = {
        email: defaultEmail,
        name: '',
        authority: defaultAuthority,
        age: defaultAge,
      };

      return request(app.getHttpServer())
        .post('/graphql')
        .send(getQuery(user))
        .expect(200)
        .expect((res) => {
          const jsonResponse: GraphQLErrorOutput = JSON.parse(res.text);
          const errorExtensions: GraphQLErrorExtensions =
            jsonResponse.errors[0].extensions;

          expect(errorExtensions.code).toEqual('BAD_USER_INPUT');
          expect(errorExtensions.response.error).toEqual('Bad Request');
          expect(errorExtensions.response.message).toEqual([
            'data.name should not be empty',
          ]);
          expect(errorExtensions.response.statusCode).toEqual(400);
        });
    });

    it('when age less than 1, an error will occur', () => {
      const user: UserCreateInput = {
        email: defaultEmail,
        name: defaultName,
        authority: defaultAuthority,
        age: 0,
      };

      return request(app.getHttpServer())
        .post('/graphql')
        .send(getQuery(user))
        .expect(200)
        .expect((res) => {
          const jsonResponse: GraphQLErrorOutput = JSON.parse(res.text);
          const errorExtensions: GraphQLErrorExtensions =
            jsonResponse.errors[0].extensions;

          expect(errorExtensions.code).toEqual('BAD_USER_INPUT');
          expect(errorExtensions.response.error).toEqual('Bad Request');
          expect(errorExtensions.response.message).toEqual([
            'data.age must not be less than 1',
          ]);
          expect(errorExtensions.response.statusCode).toEqual(400);
        });
    });
  });
});
