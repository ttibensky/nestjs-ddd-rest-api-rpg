import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { BattleId } from '../value-object/BattleId';

export class BattleHasEnded extends BaseEvent {
  constructor(
    public battleId: BattleId,
    public battleLog: BaseEvent[],
  ) {
    super();
  }
}
