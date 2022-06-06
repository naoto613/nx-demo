import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLErrorDetail } from '../../dto/errors/graphql-error-detail';

@ObjectType()
export class GraphQLErrorOutput {
  @Field(() => GraphQLErrorDetail, { nullable: true })
  errors?: GraphQLErrorDetail[];

  @Field(() => Object, { nullable: true })
  data?: object;
}
