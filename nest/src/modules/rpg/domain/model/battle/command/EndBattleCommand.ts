import { BaseCommand } from 'src/lib/common/domain/model/BaseCommand';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { BattleId } from '../value-object/BattleId';

export class EndBattleCommand extends BaseCommand {
  constructor(
    public battleId: BattleId,
    public battleLog: BaseEvent[],
  ) {
    super();
  }
}
