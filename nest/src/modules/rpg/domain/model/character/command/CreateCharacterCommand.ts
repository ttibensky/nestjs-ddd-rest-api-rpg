import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterJob } from '../value-objects/CharacterJob';
import { CharacterName } from '../value-objects/CharacterName';
import { CharacterId } from '../value-objects/CharacterId';

export class CreateCharacterCommand extends BaseCommand {
  constructor(
    public characterId: CharacterId,
    public characterName: CharacterName,
    public characterJob: CharacterJob,
  ) {
    super();
  }
}
