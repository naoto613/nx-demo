import { UserCreateInput } from "./@generated/user/user-create.input";
import { userFactory } from "./factories/users.factory";

// user
const createUsers = async () => {
  const userSeedData: Array<UserCreateInput> = [
    { name: 'テスト 一郎', email: 'test1@example.com' },
    { name: 'テスト 二郎', email: 'test2@example.com' },
    { name: 'テスト 三郎', email: 'test3@example.com' },
    { name: 'テスト 四郎', email: 'test4@example.com' },
    { name: 'テスト 五郎', email: 'test5@example.com' },
  ];

  for (const userSeed of userSeedData) {
    const user = await userFactory.create(userSeed);
    console.log(user);
  }
};

const main = async () => {
  console.log(`Start seeding ...`);

  await createUsers();

  console.log(`Seeding finished.`);
};

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
