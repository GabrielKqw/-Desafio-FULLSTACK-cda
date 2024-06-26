import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('cda-swaggers')
    .setDescription('Aplicação de usúarios')
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('users')
   
    .addBasicAuth({
      type: 'http', scheme: 'basic'
    }, 'Login')
    .addBearerAuth({
      type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header'
    }, 'JWT')
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer'
    })
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3200);
}
bootstrap();
