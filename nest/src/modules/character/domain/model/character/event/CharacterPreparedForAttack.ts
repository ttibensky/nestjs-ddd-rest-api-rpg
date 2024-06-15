import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterId } from '../value-objects/CharacterId';
import { CharacterName } from '../value-objects/CharacterName';
import { CharacterSpeed } from '../value-objects/CharacterSpeed';

export class CharacterPreparedForAttack extends BaseEvent {
  constructor(
    public characterId: CharacterId,
    public characterName: CharacterName,
    public characterSpeed: CharacterSpeed,
  ) {
    super();
  }
}
