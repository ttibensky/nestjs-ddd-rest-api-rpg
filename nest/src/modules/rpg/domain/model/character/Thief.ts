import { round } from 'lodash';
import { Character } from './Character';
import { CharacterJobStats } from './CharacterJobStats';
import { CharacterWasCreated } from './event/CharacterWasCreated';
import { CharacterDamageModifier } from './value-objects/CharacterDamageModifier';
import { CharacterDexterity } from './value-objects/CharacterDexterity';
import { CharacterHealthPoints } from './value-objects/CharacterHealthPoints';
import { CharacterId } from './value-objects/CharacterId';
import { CharacterIntelligence } from './value-objects/CharacterIntelligence';
import { CharacterJob } from './value-objects/CharacterJob';
import { CharacterName } from './value-objects/CharacterName';
import { CharacterSpeed } from './value-objects/CharacterSpeed';
import { CharacterSpeedModifier } from './value-objects/CharacterSpeedModifier';
import { CharacterStrength } from './value-objects/CharacterStrength';

const THIEF_DAMAGE_STRENGTH_MODIFIER = 0.25;
const THIEF_DAMAGE_DEXTERITY_MODIFIER = 1;
const THIEF_DAMAGE_INTELLIGENCE_MODIFIER = 0.25;
const THIEF_SPEED_DEXTERITY_MODIFIER = 0.8;

export class Thief extends Character {
  static stats() {
    return new CharacterJobStats(
      CharacterJob.Thief,
      new CharacterHealthPoints(15),
      new CharacterStrength(4),
      new CharacterDexterity(10),
      new CharacterIntelligence(4),
      new CharacterDamageModifier(
        [
          `${THIEF_DAMAGE_STRENGTH_MODIFIER * 100}% of strength`,
          `${THIEF_DAMAGE_DEXTERITY_MODIFIER * 100}% of dexterity`,
          `${THIEF_DAMAGE_INTELLIGENCE_MODIFIER * 100}% of intelligence`,
        ].join(', '),
      ),
      new CharacterSpeedModifier(
        [`${THIEF_SPEED_DEXTERITY_MODIFIER * 100}% of dexterity`].join(', '),
      ),
    );
  }

  static create(id: CharacterId, name: CharacterName): Thief {
    const character = new Thief();
    const stats = Thief.stats();

    character.recordThat(
      new CharacterWasCreated(
        id,
        name,
        stats.job,
        stats.maximumHealthPoints,
        stats.baseStrength,
        stats.baseDexterity,
        stats.baseIntelligence,
        stats.damageModifier,
        stats.speedModifier,
      ),
    );

    return character;
  }

  protected calculateSpeed(): CharacterSpeed {
    return new CharacterSpeed(
      round(
        [
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, THIEF_SPEED_DEXTERITY_MODIFIER),
        ].reduce((prev, current) => prev + current, 0),
        2,
      ),
    );
  }

  // having the defender as an arguments allows us to add defenses into the forumula
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected calculateDamage(defender: Character): CharacterHealthPoints {
    return new CharacterHealthPoints(
      round(
        [
          this.baseStrength.toNumber() *
            this.calculateModifier(0, THIEF_DAMAGE_STRENGTH_MODIFIER),
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, THIEF_DAMAGE_DEXTERITY_MODIFIER),
          this.baseIntelligence.toNumber() *
            this.calculateModifier(0, THIEF_DAMAGE_INTELLIGENCE_MODIFIER),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }
}
