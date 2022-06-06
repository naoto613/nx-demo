import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GraphQLErrorResponse {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => [String], { nullable: true })
  message?: string[];

  @Field(() => String, { nullable: true })
  statusCode?: string;
}
