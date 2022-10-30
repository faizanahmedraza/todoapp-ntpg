import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module'
import { UserScheduleModule } from './modules/user-schedule/user-schedule.module';
import { TodoModule } from './modules/todo/todo.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { I18nModule } from 'nestjs-i18n';
import { i18nConfig } from './config/i18n';
import { GraphQlConfig } from './config/graphql';
import {DatabaseConfig} from './config/database';
import { AppConfig } from './config/app';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, GraphQlConfig, DatabaseConfig, i18nConfig]
    }),
    I18nModule.forRoot(i18nConfig()),
    GraphQLModule.forRoot<ApolloDriverConfig>(GraphQlConfig()),
    TypeOrmModule.forRoot(DatabaseConfig()),
    UserModule,
    UserScheduleModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class AppModule { }
