import { HydratedDocument, Schema } from 'mongoose';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { BattleCreatedAt } from 'src/modules/rpg/domain/model/battle/value-object/BattleCreatedAt';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';
import { BattleState } from 'src/modules/rpg/domain/model/battle/value-object/BattleState';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterName } from 'src/modules/rpg/domain/model/character/value-objects/CharacterName';

export type BattleDocument = HydratedDocument<Battle>;

export const BattleSchema = new Schema({
  _id: String,
  attackerId: { type: String, get: (v: string) => new CharacterId(v) },
  attackerName: { type: String, get: (v: string) => new CharacterName(v) },
  defenderId: { type: String, get: (v: string) => new CharacterId(v) },
  defenderName: { type: String, get: (v: string) => new CharacterName(v) },
  state: { type: String, enum: Object.values(BattleState) },
  createdAt: { type: Date, get: (v: Date) => new BattleCreatedAt(v) },
  battleLog: [{ type: Object }],
});

BattleSchema.virtual('id')
  .get(function (): BattleId {
    return new BattleId(this._id);
  })
  .set(function (id: BattleId) {
    this._id = id.toString();

    return this;
  });
