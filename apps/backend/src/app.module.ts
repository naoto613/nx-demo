import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { UsersResolverModule } from './infrastructure/ioc/resolvers/users.resolver.module';
import { LoggingPlugin } from './infrastructure/plugins/logging.plugin';
import { ComplexityPlugin } from './infrastructure/plugins/complexity.plugin';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'apps/backend/src/infrastructure/prisma/schema.gql',
      ),
      // corsの設定が必要な場合に外す
      // cors: {
      //   origin: process.env.ORIGINS?.split(','),
      //   credentials: true,
      // },
      debug: process.env.NODE_ENV === 'production' ? false : true,
      playground: process.env.NODE_ENV === 'production' ? false : true,
    }),
    UsersResolverModule,
  ],
  providers: [LoggingPlugin, ComplexityPlugin],
})
export class AppModule {}
