import { HydratedDocument, Schema } from 'mongoose';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { CharacterCreatedAt } from 'src/modules/rpg/domain/model/character/value-objects/CharacterCreatedAt';
import { CharacterDexterity } from 'src/modules/rpg/domain/model/character/value-objects/CharacterDexterity';
import { CharacterHealthPoints } from 'src/modules/rpg/domain/model/character/value-objects/CharacterHealthPoints';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterIntelligence } from 'src/modules/rpg/domain/model/character/value-objects/CharacterIntelligence';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';
import { CharacterName } from 'src/modules/rpg/domain/model/character/value-objects/CharacterName';
import { CharacterStrength } from 'src/modules/rpg/domain/model/character/value-objects/CharacterStrength';

export type CharacterDocument = HydratedDocument<Character>;

export const CharacterSchema = new Schema({
  _id: String,
  name: { type: String, get: (v: string) => new CharacterName(v) },
  job: { type: String, enum: Object.values(CharacterJob) },
  maximumHealthPoints: {
    type: Number,
    get: (v: number) => new CharacterHealthPoints(v),
  },
  currentHealthPoints: {
    type: Number,
    get: (v: number) => new CharacterHealthPoints(v),
  },
  baseStrength: { type: Number, get: (v: number) => new CharacterStrength(v) },
  baseDexterity: {
    type: Number,
    get: (v: number) => new CharacterDexterity(v),
  },
  baseIntelligence: {
    type: Number,
    get: (v: number) => new CharacterIntelligence(v),
  },
  damageModifier: { type: String },
  speedModifier: { type: String },
  isAlive: { type: Boolean },
  createdAt: { type: Date, get: (v: Date) => new CharacterCreatedAt(v) },
});

CharacterSchema.virtual('id')
  .get(function (): CharacterId {
    return new CharacterId(this._id);
  })
  .set(function (id: CharacterId) {
    this._id = id.toString();

    return this;
  });
