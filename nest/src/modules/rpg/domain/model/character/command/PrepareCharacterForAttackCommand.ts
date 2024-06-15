import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterId } from '../value-objects/CharacterId';

export class PrepareCharacterForAttackCommand extends BaseCommand {
  constructor(public characterId: CharacterId) {
    super();
  }
}
