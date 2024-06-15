import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterId } from '../../character/value-objects/CharacterId';

export class CreateBattleCommand extends BaseCommand {
  constructor(
    public attackerId: CharacterId,
    public defenderId: CharacterId,
  ) {
    super();
  }
}
