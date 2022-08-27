import { ArgsType, Field, InputType } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { Authority } from '../../infrastructure/prisma/@generated/prisma/authority.enum';

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

  // @Field(() => Number, { nullable: true })
  // @Validator.IsNumber({maxDecimalPlaces: 2})
  // @Validator.Max(99)
  // test?: number;

  // @Field(() => String, { nullable: true })
  // @Validator.IsDateString()
  // test?: string;

  @Field(() => Number, { nullable: true })
  take?: number;
}
