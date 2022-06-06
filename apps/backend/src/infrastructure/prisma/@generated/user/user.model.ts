import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { Authority } from '../prisma/authority.enum';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => Int, {nullable:true})
    age!: number | null;

    @HideField()
    createdAt!: Date;

    @HideField()
    updatedAt!: Date;

    @Field(() => Authority, {nullable:false,defaultValue:'THIRD'})
    authority!: keyof typeof Authority;

    @HideField()
    hashedRefreshToken!: string | null;
}
