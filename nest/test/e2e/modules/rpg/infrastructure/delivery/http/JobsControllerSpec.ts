import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';

describe('JobsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/job (GET)', () => {
    return request(app.getHttpServer())
      .get('/job')
      .expect(200)
      .expect([
        {
          job: 'warrior',
          maximumHealthPoints: { value: 20 },
          baseStrength: { value: 10 },
          baseDexterity: { value: 5 },
          baseIntelligence: { value: 5 },
          damageModifier: { value: '80% of strength, 20% of dexterity' },
          speedModifier: { value: '60% of dexterity, 20% of intelligence' },
        },
        {
          job: 'thief',
          maximumHealthPoints: { value: 15 },
          baseStrength: { value: 4 },
          baseDexterity: { value: 10 },
          baseIntelligence: { value: 4 },
          damageModifier: {
            value: '25% of strength, 100% of dexterity, 25% of intelligence',
          },
          speedModifier: { value: '80% of dexterity' },
        },
        {
          job: 'mage',
          maximumHealthPoints: { value: 12 },
          baseStrength: { value: 5 },
          baseDexterity: { value: 6 },
          baseIntelligence: { value: 10 },
          damageModifier: {
            value: '20% of strength, 20% of dexterity, 120% of intelligence',
          },
          speedModifier: { value: '40% of dexterity, 10% of strength' },
        },
      ]);
  });

  afterAll(async () => {
    await app?.close();
  });
});
