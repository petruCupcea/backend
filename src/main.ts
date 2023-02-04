import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8100',
  });
  await app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on port 3000');
  });
}
bootstrap();