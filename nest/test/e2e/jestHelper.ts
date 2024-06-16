import { INestApplication, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { AppModule } from 'src/app.module';

export async function initNest(): Promise<INestApplication<any>> {
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

export async function clearNest(app: INestApplication<any>): Promise<void> {
  await app.close();
  await mongoose.disconnect();
}
