import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './shared/filters/global-http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { 
      origin: [
        'http://localhost:4200'
      ]
    } 
  });
  app.useGlobalFilters(new GlobalHttpExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
