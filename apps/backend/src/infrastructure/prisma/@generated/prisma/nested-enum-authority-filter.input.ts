import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Authority } from './authority.enum';

@InputType()
export class NestedEnumAuthorityFilter {

    @Field(() => Authority, {nullable:true})
    equals?: keyof typeof Authority;

    @Field(() => [Authority], {nullable:true})
    in?: Array<keyof typeof Authority>;

    @Field(() => [Authority], {nullable:true})
    notIn?: Array<keyof typeof Authority>;

    @Field(() => NestedEnumAuthorityFilter, {nullable:true})
    not?: NestedEnumAuthorityFilter;
}
