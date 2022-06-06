import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLErrorExtensions } from '../../dto/errors/graphql-error-extensions';

@ObjectType()
export class GraphQLErrorDetail {
  @Field(() => GraphQLErrorExtensions, { nullable: true })
  extensions?: GraphQLErrorExtensions;

  @Field(() => String, { nullable: true })
  message?: string;
}
