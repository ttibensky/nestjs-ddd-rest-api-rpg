import { Either, Maybe } from 'purify-ts';
import { BattleId } from './value-object/BattleId';
import { Battle } from './Battle';

export interface Battles {
  get(id: BattleId): Promise<Either<Error, Battle>>;
  find(id: BattleId): Promise<Maybe<Battle>>;
  create(battle: Battle): Promise<void>;
  update(battle: Battle): Promise<void>;
}

export const Battles = Symbol('Battles');
