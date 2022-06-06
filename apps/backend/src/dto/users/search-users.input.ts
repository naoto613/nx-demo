import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Authority } from '@prisma/client';

@InputType()
class SearchInput {
  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  authority?: Authority;
}

@ArgsType()
export class SearchUsersInput {
  @Field(() => SearchInput, { nullable: true })
  searchInput?: SearchInput;

  @Field(() => Number, { nullable: true })
  skip?: number;

  @Field(() => Number, { nullable: true })
  take?: number;
}
