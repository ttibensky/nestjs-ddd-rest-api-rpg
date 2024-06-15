import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterId } from '../value-objects/CharacterId';

export class AttackCharacterCommand extends BaseCommand {
  constructor(
    public characterId: CharacterId,
    public attackerId: CharacterId,
  ) {
    super();
  }
}
