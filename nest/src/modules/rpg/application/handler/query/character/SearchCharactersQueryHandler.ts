import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { SearchCharactersQuery } from 'src/modules/rpg/domain/model/character/query/SearchCharactersQuery';

@QueryHandler(SearchCharactersQuery)
export class SearchCharactersQueryHandler
  implements IQueryHandler<SearchCharactersQuery>
{
  constructor(@Inject(Characters) private readonly characters: Characters) {}

  async execute(query: SearchCharactersQuery): Promise<Character[]> {
    return await this.characters.search(query);
  }
}
