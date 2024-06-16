import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import initNest from 'test/e2e/jestHelper';

describe('JobController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initNest();
  });

  it('/job (GET) 200', () => {
    return request(app.getHttpServer())
      .get('/job')
      .expect(200)
      .expect([
        {
          job: 'warrior',
          maximumHealthPoints: '20',
          baseStrength: '10',
          baseDexterity: '5',
          baseIntelligence: '5',
          damageModifier: '80% of strength, 20% of dexterity',
          speedModifier: '60% of dexterity, 20% of intelligence',
        },
        {
          job: 'thief',
          maximumHealthPoints: '15',
          baseStrength: '4',
          baseDexterity: '10',
          baseIntelligence: '4',
          damageModifier:
            '25% of strength, 100% of dexterity, 25% of intelligence',
          speedModifier: '80% of dexterity',
        },
        {
          job: 'mage',
          maximumHealthPoints: '12',
          baseStrength: '5',
          baseDexterity: '6',
          baseIntelligence: '10',
          damageModifier:
            '20% of strength, 20% of dexterity, 120% of intelligence',
          speedModifier: '40% of dexterity, 10% of strength',
        },
      ]);
  });

  afterAll(async () => {
    await app.close();
  });
});
