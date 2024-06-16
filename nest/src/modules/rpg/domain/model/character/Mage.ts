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

const MAGE_DAMAGE_STRENGTH_MODIFIER = 0.2;
const MAGE_DAMAGE_DEXTERITY_MODIFIER = 0.2;
const MAGE_DAMAGE_INTELLIGENCE_MODIFIER = 1.2;
const MAGE_SPEED_DEXTERITY_MODIFIER = 0.4;
const MAGE_SPEED_STRENGTH_MODIFIER = 0.1;

export class Mage extends Character {
  static stats() {
    return new CharacterJobStats(
      CharacterJob.Mage,
      new CharacterHealthPoints(12),
      new CharacterStrength(5),
      new CharacterDexterity(6),
      new CharacterIntelligence(10),
      new CharacterDamageModifier(
        [
          `${MAGE_DAMAGE_STRENGTH_MODIFIER * 100}% of strength`,
          `${MAGE_DAMAGE_DEXTERITY_MODIFIER * 100}% of dexterity`,
          `${MAGE_DAMAGE_INTELLIGENCE_MODIFIER * 100}% of intelligence`,
        ].join(', '),
      ),
      new CharacterSpeedModifier(
        [
          `${MAGE_SPEED_DEXTERITY_MODIFIER * 100}% of dexterity`,
          `${MAGE_SPEED_STRENGTH_MODIFIER * 100}% of strength`,
        ].join(', '),
      ),
    );
  }

  static create(id: CharacterId, name: CharacterName): Mage {
    const character = new Mage();
    const stats = Mage.stats();

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
      Math.round(
        [
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, MAGE_SPEED_DEXTERITY_MODIFIER),
          this.baseStrength.toNumber() *
            this.calculateModifier(0, MAGE_SPEED_STRENGTH_MODIFIER),
        ].reduce((prev, current) => prev + current, 0) * 100,
      ) / 100,
    );
  }

  // having the defender as an arguments allows us to add defenses into the forumula
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected calculateDamage(defender: Character): CharacterHealthPoints {
    return new CharacterHealthPoints(
      Math.round(
        [
          this.baseStrength.toNumber() *
            this.calculateModifier(0, MAGE_DAMAGE_STRENGTH_MODIFIER),
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, MAGE_DAMAGE_DEXTERITY_MODIFIER),
          this.baseIntelligence.toNumber() *
            this.calculateModifier(0, MAGE_DAMAGE_INTELLIGENCE_MODIFIER),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }
}
