import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { BattleWasCreated } from 'src/modules/rpg/domain/model/battle/event/BattleWasCreated';
import { CharacterPreparedForAttack } from 'src/modules/rpg/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/rpg/domain/model/character/event/CharacterWasAttacked';

export class BattleView {
  @ApiProperty({
    type: 'array',
    items: {
      oneOf: [
        {
          $ref: getSchemaPath(BattleWasCreated),
        },
        {
          $ref: getSchemaPath(CharacterPreparedForAttack),
        },
        {
          $ref: getSchemaPath(CharacterWasAttacked),
        },
      ],
    },
  })
  battleLog: BaseEvent[];

  constructor(
    public id: string,
    public attackerId: string,
    public attackerName: string,
    public defenderId: string,
    public defenderName: string,
    public state: string,
    public createdAt: string,
    battleLog: BaseEvent[],
  ) {
    this.battleLog = battleLog;
  }
}
