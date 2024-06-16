import { INestApplication } from '@nestjs/common';
import { isArray, isObject } from 'lodash';
import * as request from 'supertest';
import { clearNest, initNest } from 'test/e2e/jestHelper';

describe('CharacterController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initNest();
  });

  it('/character (POST) 200', async () => {
    const response = await request(app.getHttpServer())
      .post('/character')
      .send({
        name: 'Medivh',
        job: 'mage',
      })
      .expect(200);

    expect(isObject(response.body)).toBeTruthy();
    expect(typeof response.body.id).toBe('string');
    expect(typeof response.body.name).toBe('string');
    expect(typeof response.body.job).toBe('string');
    expect(typeof response.body.maximumHealthPoints).toBe('number');
    expect(typeof response.body.currentHealthPoints).toBe('number');
    expect(typeof response.body.baseStrength).toBe('number');
    expect(typeof response.body.baseDexterity).toBe('number');
    expect(typeof response.body.baseIntelligence).toBe('number');
    expect(typeof response.body.damageModifier).toBe('string');
    expect(typeof response.body.speedModifier).toBe('string');
    expect(typeof response.body.isAlive).toBe('boolean');
    expect(typeof response.body.createdAt).toBe('string');
  });

  it('/character (POST) 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/character')
      .send({
        name: 'Sylvanas Windrunner', // too long, contains space
        job: 'hunter', // unsupported job
      })
      .expect(400);

    expect(response.body.message).toStrictEqual([
      'name must match /^[a-zA-Z_]{4,15}$/ regular expression',
      'job must be one of the following values: warrior, thief, mage',
    ]);
  });

  it('/character (GET) 200', async () => {
    const response = await request(app.getHttpServer())
      .get('/character')
      .expect(200);

    expect(isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(typeof response.body[0].id).toBe('string');
    expect(typeof response.body[0].name).toBe('string');
    expect(typeof response.body[0].job).toBe('string');
    expect(typeof response.body[0].maximumHealthPoints).toBe('number');
    expect(typeof response.body[0].currentHealthPoints).toBe('number');
    expect(typeof response.body[0].baseStrength).toBe('number');
    expect(typeof response.body[0].baseDexterity).toBe('number');
    expect(typeof response.body[0].baseIntelligence).toBe('number');
    expect(typeof response.body[0].damageModifier).toBe('string');
    expect(typeof response.body[0].speedModifier).toBe('string');
    expect(typeof response.body[0].isAlive).toBe('boolean');
    expect(typeof response.body[0].createdAt).toBe('string');
  });

  it('/character/:id (GET) 200', () => {
    return request(app.getHttpServer())
      .get('/character/7431f870-1b32-4acd-9aa9-17edce6570e2')
      .expect(200)
      .expect({
        id: '7431f870-1b32-4acd-9aa9-17edce6570e2',
        name: 'Jaina',
        job: 'mage',
        maximumHealthPoints: 12,
        currentHealthPoints: 12,
        baseStrength: 5,
        baseDexterity: 6,
        baseIntelligence: 10,
        damageModifier:
          '20% of strength, 20% of dexterity, 120% of intelligence',
        speedModifier: '40% of dexterity, 10% of strength',
        isAlive: true,
        createdAt: '2024-06-15T20:48:28Z',
      });
  });

  it('/character/:id (GET) 400', async () => {
    const response = await request(app.getHttpServer())
      .get('/character/xxxx') // invalid UUIDv4 string
      .expect(400);

    expect(response.body.message).toStrictEqual(
      'Validation failed (uuid is expected)',
    );
  });

  it('/character/:id (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/character/f2d294ad-0a1a-47f3-99fb-ff9b9818bb18') // character with this ID does not exist
      .expect(404);
  });

  afterAll(async () => {
    await clearNest(app);
  });
});
