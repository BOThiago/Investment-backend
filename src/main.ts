import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

function validateOrigin(origin: string, pattern: string) {
  if (pattern.indexOf('*') > -1) {
    const subdominio = `([^\\.]*\\.)?`;
    const expressao = `^(${pattern.replace('*.', subdominio)})$`;
    const regex = RegExp(expressao, 'g');
    return regex.test(origin);
  } else {
    return origin === pattern;
  }
}

async function enableCorsApp(app: INestApplication) {
  const options: CorsOptions = {
    origin: [/^(.*)/],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS,
    exposedHeaders: process.env.CORS_EXPOSED_HEADERS,
  };
  if (process.env.APP_CORS_DISABLE === 'true') {
    app.enableCors(options);
  } else {
    let allowedOrigins = [];
    if (process.env.APP_CORS_ORIGINS) {
      allowedOrigins = String(process.env.APP_CORS_ORIGINS).split(',');
    }

    options.origin = function (origin: any, callback: any) {
      let valid = false;
      for (const allowed of allowedOrigins) {
        valid = valid || validateOrigin(origin, allowed);
      }

      if (!origin || valid) {
        callback(null, true);
      } else {
        callback(new Error(`(${origin}) not allowed by CORS `));
      }
    };

    app.enableCors(options);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await enableCorsApp(app);

  await app.listen(5500);
}
bootstrap();
