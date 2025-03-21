import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { GraphQLModule } from '@nestjs/graphql';

import { ApolloDriverConfig } from '@nestjs/apollo';
import ConfigAsyncGraphqlModule from './config/graphql-module/graphqlModule';
import { AppController } from './app.controller';

import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  controllers: [AppController],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(ConfigAsyncGraphqlModule),
    PostModule,
    MongooseModule.forRoot(
      'mongodb://admin:password@localhost:27017/todo?authSource=admin',
    ),
    UsersModule,
  ],
})
export class AppModule {}
