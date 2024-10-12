import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { config } from 'dotenv';
import { logLevels } from '~core/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: logLevels(process.env.APP_LOG_LEVEL) });
  const configService = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.setGlobalPrefix(configService.get<string>('apiPrefix'));

  const config = new DocumentBuilder()
    .setTitle('Location Tree Builder API')
    .setDescription('<p><strong>Author:</strong> Phan Thanh Giang </p> <p><strong>Email:</strong> thanhgiang.009@gmail.com</p>')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    }
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);
  await app.listen(configService.get<number>("port"));
}

config({ path: [".env", "local/.env"] })
bootstrap();
