import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Authority } from './authority.enum';

@InputType()
export class EnumAuthorityFieldUpdateOperationsInput {

    @Field(() => Authority, {nullable:true})
    set?: keyof typeof Authority;
}
