import { CharacterDamageModifier } from './value-objects/CharacterDamageModifier';
import { CharacterDexterity } from './value-objects/CharacterDexterity';
import { CharacterHealthPoints } from './value-objects/CharacterHealthPoints';
import { CharacterIntelligence } from './value-objects/CharacterIntelligence';
import { CharacterJob } from './value-objects/CharacterJob';
import { CharacterSpeedModifier } from './value-objects/CharacterSpeedModifier';
import { CharacterStrength } from './value-objects/CharacterStrength';

export class CharacterJobStats {
  constructor(
    public job: CharacterJob,
    public maximumHealthPoints: CharacterHealthPoints,
    public baseStrength: CharacterStrength,
    public baseDexterity: CharacterDexterity,
    public baseIntelligence: CharacterIntelligence,
    public damageModifier: CharacterDamageModifier,
    public speedModifier: CharacterSpeedModifier,
  ) {}
}
