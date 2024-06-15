import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Maybe } from 'purify-ts';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { FindCharacterQuery } from 'src/modules/rpg/domain/model/character/query/FindCharacterQuery';

@QueryHandler(FindCharacterQuery)
export class FindCharacterQueryHandler
  implements IQueryHandler<FindCharacterQuery>
{
  constructor(@Inject(Characters) private readonly characters: Characters) {}

  execute(query: FindCharacterQuery): Promise<Maybe<Character>> {
    return this.characters.find(query.characterId);
  }
}
