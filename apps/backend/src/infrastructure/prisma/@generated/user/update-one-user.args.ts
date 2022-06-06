import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserUpdateInput } from './user-update.input';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserWhereUniqueInput } from './user-where-unique.input';

@ArgsType()
export class UpdateOneUserArgs {

    @Field(() => UserUpdateInput, {nullable:false})
    @ValidateNested()
    @Type(() => UserUpdateInput)
    data!: UserUpdateInput;

    @Field(() => UserWhereUniqueInput, {nullable:false})
    where!: UserWhereUniqueInput;
}
