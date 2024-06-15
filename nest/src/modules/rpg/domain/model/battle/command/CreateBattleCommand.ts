import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterId } from '../../character/value-objects/CharacterId';
import { BattleId } from '../value-object/BattleId';

export class CreateBattleCommand extends BaseCommand {
  constructor(
    public battleId: BattleId,
    public attackerId: CharacterId,
    public defenderId: CharacterId,
  ) {
    super();
  }
}
