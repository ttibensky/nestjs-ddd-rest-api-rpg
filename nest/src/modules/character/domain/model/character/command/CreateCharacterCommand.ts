import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterJob } from '../value-objects/CharacterJob';
import { CharacterName } from '../value-objects/CharacterName';

export class CreateCharacterCommand extends BaseCommand {
  constructor(
    public characterName: CharacterName,
    public characterJob: CharacterJob,
  ) {
    super();
  }
}
