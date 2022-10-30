import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Container } from 'typedi';
import {useContainer} from "class-validator";
import { AppModule } from './app.module';
import { i18nValidationErrorFactory, I18nValidationExceptionFilter } from 'nestjs-i18n';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(Container);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  await app.listen(process.env.APP_PORT);
}
bootstrap();
