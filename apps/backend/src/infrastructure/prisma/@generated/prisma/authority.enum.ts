import { registerEnumType } from '@nestjs/graphql';

export enum Authority {
    FIRST = "FIRST",
    SECOND = "SECOND",
    THIRD = "THIRD"
}


registerEnumType(Authority, { name: 'Authority', description: undefined })
