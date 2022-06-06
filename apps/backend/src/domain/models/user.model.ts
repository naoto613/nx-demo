import { ObjectType } from '@nestjs/graphql';
import { User } from '../../infrastructure/prisma/@generated/user/user.model';

@ObjectType()
export class UserModel extends User {}
