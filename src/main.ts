import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Setup } from './config/setup.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  Setup.setupDocumentations(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
