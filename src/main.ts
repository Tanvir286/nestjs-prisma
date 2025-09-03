import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  // ✅ Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // DTO তে define করা field ছাড়া extra field ignore করবে
      forbidNonWhitelisted: true, // extra field থাকলে error দিবে
      transform: true,       // incoming payload কে DTO type এ convert করবে (e.g., string -> number)
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();




