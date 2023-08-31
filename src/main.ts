import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { TransformationInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import { config } from 'aws-sdk';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  // config env
  const configService = app.get<ConfigService>(ConfigService);
  
  // config cookie
  app.use(cookieParser());
  // Config Validation
  app.useGlobalPipes(new ValidationPipe({whitelist:true}));

  // config response data
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformationInterceptor(reflector));
  // config version
  app.setGlobalPrefix('api');
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  })

  // config cors
  app.enableCors();

  // Config aws s3
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_ACCESS_SECRET_KEY'),
    region: configService.get('AWS_S3_REGION'),
  });
  
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
