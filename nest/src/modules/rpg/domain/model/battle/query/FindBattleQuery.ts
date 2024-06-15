import { BaseQuery } from 'src/lib/common/domain/model/BaseQuery';
import { BattleId } from '../value-object/BattleId';

export class FindBattleQuery extends BaseQuery {
  constructor(public battleId: BattleId) {
    super();
  }
}
