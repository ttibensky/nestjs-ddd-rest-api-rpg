import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';

export default async function initNest() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
    providers: [
      {
        provide: APP_PIPE,
        useClass: ValidationPipe,
      },
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}
