import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Authority } from './authority.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumAuthorityFilter } from './nested-enum-authority-filter.input';

@InputType()
export class NestedEnumAuthorityWithAggregatesFilter {

    @Field(() => Authority, {nullable:true})
    equals?: keyof typeof Authority;

    @Field(() => [Authority], {nullable:true})
    in?: Array<keyof typeof Authority>;

    @Field(() => [Authority], {nullable:true})
    notIn?: Array<keyof typeof Authority>;

    @Field(() => NestedEnumAuthorityWithAggregatesFilter, {nullable:true})
    not?: NestedEnumAuthorityWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumAuthorityFilter, {nullable:true})
    _min?: NestedEnumAuthorityFilter;

    @Field(() => NestedEnumAuthorityFilter, {nullable:true})
    _max?: NestedEnumAuthorityFilter;
}
