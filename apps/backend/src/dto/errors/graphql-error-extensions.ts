import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLErrorResponse } from '../../dto/errors/graphql-error-response';

@ObjectType()
export class GraphQLErrorExtensions {
  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => GraphQLErrorResponse, { nullable: true })
  response?: GraphQLErrorResponse;
}
