import { INestApplication } from '@nestjs/common';
import { isArray, isObject } from 'lodash';
import { BattleState } from 'src/modules/rpg/domain/model/battle/value-object/BattleState';
import * as request from 'supertest';
import { clearNest, initNest } from 'test/e2e/jestHelper';

describe('BattleController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await initNest();
  });

  it('/battle (POST) 200', async () => {
    const attackerResponse = await request(app.getHttpServer())
      .post('/character')
      .send({
        name: 'Attacker',
        job: 'mage',
      })
      .expect(200);

    const defenderResponse = await request(app.getHttpServer())
      .post('/character')
      .send({
        name: 'Deffender',
        job: 'thief',
      })
      .expect(200);

    const battleResponse = await request(app.getHttpServer())
      .post('/battle')
      .send({
        attackerId: attackerResponse.body.id,
        defenderId: defenderResponse.body.id,
      })
      .expect(200);

    expect(isObject(battleResponse.body)).toBeTruthy();
    expect(typeof battleResponse.body.id).toBe('string');
    expect(battleResponse.body.attackerId).toStrictEqual(
      attackerResponse.body.id,
    );
    expect(battleResponse.body.attackerName).toStrictEqual('Attacker');
    expect(battleResponse.body.defenderId).toStrictEqual(
      defenderResponse.body.id,
    );
    expect(battleResponse.body.defenderName).toStrictEqual('Deffender');
    expect(battleResponse.body.state).toStrictEqual(BattleState.Ongoing);
    expect(typeof battleResponse.body.createdAt).toBe('string');
    expect(battleResponse.body.battleLog).toStrictEqual([]);
  });

  it('/battle (POST) 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/battle')
      .send({
        attackerId: 'xxxx', // invalid UUIDv4 string
        defenderId: 'xxxx', // invalid UUIDv4 string
      })
      .expect(400);

    expect(response.body.message).toStrictEqual([
      'attackerId must match /^[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}$/ regular expression',
      'defenderId must match /^[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}$/ regular expression',
    ]);
  });

  it('/battle (POST) 404', () => {
    return request(app.getHttpServer())
      .post('/battle')
      .send({
        attackerId: '89469247-5fbd-47dd-ac1a-f6c23ea5e1ea', // character with this ID does not exist
        defenderId: 'dde47ce0-3ce0-4e09-a85f-3bc0abddb9ab', // character with this ID does not exist
      })
      .expect(404);
  });

  it('/battle/:id (GET) 200', async () => {
    const response = await request(app.getHttpServer())
      .get('/battle/066c0485-5408-4902-b06f-85dcbf89dcd7')
      .expect(200);

    expect(response.body.id).toStrictEqual(
      '066c0485-5408-4902-b06f-85dcbf89dcd7',
    );
    expect(response.body.attackerId).toStrictEqual(
      '7431f870-1b32-4acd-9aa9-17edce6570e2',
    );
    expect(response.body.attackerName).toStrictEqual('Jaina');
    expect(response.body.defenderId).toStrictEqual(
      '24ed098d-2adc-4b1f-99d1-6455a6e273d3',
    );
    expect(response.body.defenderName).toStrictEqual('Cairne');
    expect(response.body.state).toStrictEqual(BattleState.Ended);
    expect(typeof response.body.createdAt).toBe('string');
    expect(isArray(response.body.battleLog)).toBeTruthy();
    expect(response.body.battleLog[0].eventId).toStrictEqual({
      uuid: '02fafa2b-700f-4db9-be9d-e499bf0ba199',
    });
    expect(response.body.battleLog[0].eventName).toStrictEqual(
      'BattleWasCreated',
    );

    const lastEvent = response.body.battleLog.pop();
    expect(lastEvent.attackerHealthPoints.value).toStrictEqual(4);
    expect(lastEvent.defenderHealthPoints.value).toStrictEqual(0);
  });

  it('/battle/:id (GET) 400', async () => {
    const response = await request(app.getHttpServer())
      .get('/battle/xxxx') // invalid UUIDv4 string
      .expect(400);

    expect(response.body.message).toStrictEqual(
      'Validation failed (uuid is expected)',
    );
  });

  it('/battle/:id (GET) 404', () => {
    return request(app.getHttpServer())
      .get('/battle/f2d294ad-0a1a-47f3-99fb-ff9b9818bb18') // battle with this ID does not exist
      .expect(404);
  });

  afterAll(async () => {
    await clearNest(app);
  });
});
