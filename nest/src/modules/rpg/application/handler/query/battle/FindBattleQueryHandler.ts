import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Maybe } from 'purify-ts';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { Battles } from 'src/modules/rpg/domain/model/battle/Battles';
import { FindBattleQuery } from 'src/modules/rpg/domain/model/battle/query/FindBattleQuery';

@QueryHandler(FindBattleQuery)
export class FindBattleQueryHandler implements IQueryHandler<FindBattleQuery> {
  constructor(@Inject(Battles) private readonly battles: Battles) {}

  execute(query: FindBattleQuery): Promise<Maybe<Battle>> {
    return this.battles.find(query.battleId);
  }
}
