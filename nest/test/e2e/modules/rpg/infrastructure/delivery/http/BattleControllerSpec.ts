import { INestApplication } from '@nestjs/common';
import { isArray } from 'lodash';
import { BattleState } from 'src/modules/rpg/domain/model/battle/value-object/BattleState';
import * as request from 'supertest';
import initNest from 'test/e2e/jestHelper';

describe('BattleController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initNest();
  });

  it('/battle/:id (GET) 200', async () => {
    const response = await request(app.getHttpServer())
      .get('/battle/86d1bb24-e9fa-499e-a7c0-881138038e35')
      .expect(200);

    expect(response.body.id).toStrictEqual(
      '86d1bb24-e9fa-499e-a7c0-881138038e35',
    );
    expect(response.body.attackerId).toStrictEqual(
      '7431f870-1b32-4acd-9aa9-17edce6570e2',
    );
    expect(response.body.attackerName).toStrictEqual('Jaina');
    expect(response.body.defenderId).toStrictEqual(
      '492e0894-4b8d-46c7-888c-bd3535e5fbc3',
    );
    expect(response.body.defenderName).toStrictEqual('Garona');
    expect(response.body.state).toStrictEqual(BattleState.Ended);
    expect(typeof response.body.createdAt).toBe('string');
    expect(isArray(response.body.battleLog)).toBeTruthy();
    expect(response.body.battleLog[0].eventId).toStrictEqual({
      uuid: '02c93654-93f9-4cc7-9afb-9ca0ee8f75e0',
    });
    expect(response.body.battleLog[0].eventName).toStrictEqual(
      'BattleWasCreated',
    );
  });

  it('/battle/:id (GET) 400', async () => {
    const response = await request(app.getHttpServer())
      .get('/battle/xxxx')
      .expect(400);

    expect(response.body.message).toStrictEqual(
      'Validation failed (uuid is expected)',
    );
  });

  it('/battle/:id (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/battle/f2d294ad-0a1a-47f3-99fb-ff9b9818bb18')
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
