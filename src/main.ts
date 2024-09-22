import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth/auth.guard';

async function bootstrap() {

  //app initiated(app is created here)
  const app = await NestFactory.create(AppModule);

  // all middlewares are registered here
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalGuards(new AuthGuard(
    new JwtService(),
    new Reflector(),
  ),
);

  //application start
  await app.listen(3000);
}
bootstrap();
