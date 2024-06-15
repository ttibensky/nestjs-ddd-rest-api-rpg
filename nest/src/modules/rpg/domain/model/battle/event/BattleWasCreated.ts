import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterId } from '../../character/value-objects/CharacterId';
import { CharacterName } from '../../character/value-objects/CharacterName';
import { BattleId } from '../value-object/BattleId';

export class BattleWasCreated extends BaseEvent {
  constructor(
    public battleId: BattleId,
    public attackerId: CharacterId,
    public attackerName: CharacterName,
    public defenderId: CharacterId,
    public defenderName: CharacterName,
  ) {
    super();
  }
}
