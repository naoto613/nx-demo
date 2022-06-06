import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserUpdateManyMutationInput } from './user-update-many-mutation.input';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserWhereInput } from './user-where.input';

@ArgsType()
export class UpdateManyUserArgs {

    @Field(() => UserUpdateManyMutationInput, {nullable:false})
    @ValidateNested()
    @Type(() => UserUpdateManyMutationInput)
    data!: UserUpdateManyMutationInput;

    @Field(() => UserWhereInput, {nullable:true})
    where?: UserWhereInput;
}
