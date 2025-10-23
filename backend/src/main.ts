import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  // Global exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('CDA - Sistema de Conquistas')
    .setDescription('API completa para gerenciamento de usuários e emblemas/conquistas')
    .setVersion('1.0.0')
    .addTag('status', 'Verificação de status da API')
    .addTag('auth', 'Autenticação e autorização de usuários')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('achievements', 'Gerenciamento de emblemas e conquistas')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      description: 'Insira o token JWT obtido no endpoint de login',
    }, 'JWT')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3200);
}
bootstrap();
