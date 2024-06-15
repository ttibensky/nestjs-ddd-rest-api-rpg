import { BaseQuery } from 'src/lib/common/domain/model/BaseQuery';
import { CharacterId } from '../value-objects/CharacterId';

export class FindCharacterQuery extends BaseQuery {
  constructor(public characterId: CharacterId) {
    super();
  }
}
