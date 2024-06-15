import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterHealthPoints } from '../value-objects/CharacterHealthPoints';
import { CharacterId } from '../value-objects/CharacterId';
import { CharacterName } from '../value-objects/CharacterName';
import { CharacterJob } from '../value-objects/CharacterJob';
import { CharacterStrength } from '../value-objects/CharacterStrength';
import { CharacterIntelligence } from '../value-objects/CharacterIntelligence';
import { CharacterDexterity } from '../value-objects/CharacterDexterity';

export class CharacterWasCreated extends BaseEvent {
  constructor(
    public characterId: CharacterId,
    public characterName: CharacterName,
    public characterJob: CharacterJob,
    public characterHealthPoints: CharacterHealthPoints,
    public characterStrength: CharacterStrength,
    public characterDexterity: CharacterDexterity,
    public characterIntelligence: CharacterIntelligence,
  ) {
    super();
  }
}
