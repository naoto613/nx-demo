import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import * as Validator from 'class-validator';
import { HideField } from '@nestjs/graphql';
import { Authority } from '../prisma/authority.enum';

@InputType()
export class UserCreateManyInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    @Validator.IsEmail()
    email!: string;

    @Field(() => String, {nullable:false})
    @Validator.IsNotEmpty()
    name!: string;

    @Field(() => Int, {nullable:true})
    @Validator.IsOptional()
    @Validator.Min(1)
    age?: number;

    @HideField()
    createdAt?: Date | string;

    @HideField()
    updatedAt?: Date | string;

    @Field(() => Authority, {nullable:true})
    authority?: keyof typeof Authority;

    @HideField()
    hashedRefreshToken?: string;
}
