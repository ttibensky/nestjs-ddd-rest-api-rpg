import { Character } from './Character';
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

const WARRIOR_DAMAGE_STRENGTH_MODIFIER = 0.8;
const WARRIOR_DAMAGE_DEXTERITY_MODIFIER = 0.2;
const WARRIOR_SPEED_DEXTERITY_MODIFIER = 0.6;
const WARRIOR_SPEED_INTELLIGENCE_MODIFIER = 0.2;

export class Warrior extends Character {
  static create(id: CharacterId, name: CharacterName): Warrior {
    const character = new Warrior();

    character.recordThat(
      new CharacterWasCreated(
        id,
        name,
        CharacterJob.Warrior,
        new CharacterHealthPoints(20),
        new CharacterStrength(10),
        new CharacterDexterity(5),
        new CharacterIntelligence(5),
        new CharacterDamageModifier(
          [
            `${WARRIOR_DAMAGE_STRENGTH_MODIFIER * 100}% of strength`,
            `${WARRIOR_DAMAGE_DEXTERITY_MODIFIER * 100}% of dexterity`,
          ].join(', '),
        ),
        new CharacterSpeedModifier(
          [
            `${WARRIOR_SPEED_DEXTERITY_MODIFIER * 100}% of dexterity`,
            `${WARRIOR_SPEED_INTELLIGENCE_MODIFIER * 100}% of intelligence`,
          ].join(', '),
        ),
      ),
    );

    return character;
  }

  protected calculateSpeed(): CharacterSpeed {
    return new CharacterSpeed(
      Math.round(
        [
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, WARRIOR_SPEED_DEXTERITY_MODIFIER),
          this.baseIntelligence.toNumber() *
            this.calculateModifier(0, WARRIOR_SPEED_INTELLIGENCE_MODIFIER),
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
            this.calculateModifier(0, WARRIOR_DAMAGE_STRENGTH_MODIFIER),
          this.baseDexterity.toNumber() *
            this.calculateModifier(0, WARRIOR_DAMAGE_DEXTERITY_MODIFIER),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }
}
