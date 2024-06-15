import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { CharacterId } from '../../character/value-objects/CharacterId';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';

export class EndBattleCommand extends BaseCommand {
  constructor(
    public attackerId: CharacterId,
    public defenderId: CharacterId,
    public battleLog: BaseEvent[],
  ) {
    super();
  }
}
