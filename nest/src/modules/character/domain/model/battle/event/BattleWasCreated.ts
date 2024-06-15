import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterId } from '../../character/value-objects/CharacterId';
import { CharacterName } from '../../character/value-objects/CharacterName';

export class BattleWasCreated extends BaseEvent {
  constructor(
    public attackerId: CharacterId,
    public attackerName: CharacterName,
    public defenderId: CharacterId,
    public defenderName: CharacterName,
    public battleLog: BaseEvent[],
  ) {
    super();
  }
}
