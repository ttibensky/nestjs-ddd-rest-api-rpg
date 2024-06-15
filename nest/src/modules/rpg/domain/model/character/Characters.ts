import { Either, Maybe } from 'purify-ts';
import { Character } from './Character';
import { CharacterId } from './value-objects/CharacterId';
import { SearchCharactersQuery } from './query/SearchCharactersQuery';

export interface Characters {
  get(id: CharacterId): Promise<Either<Error, Character>>;
  find(id: CharacterId): Promise<Maybe<Character>>;
  search(query: SearchCharactersQuery): Promise<Character[]>;
  create(character: Character): Promise<void>;
  update(character: Character): Promise<void>;
}

export const Characters = Symbol('Characters');
