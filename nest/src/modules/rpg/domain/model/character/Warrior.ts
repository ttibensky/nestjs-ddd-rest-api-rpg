import { Character } from './Character';
import { CharacterWasCreated } from './event/CharacterWasCreated';
import { CharacterDexterity } from './value-objects/CharacterDexterity';
import { CharacterHealthPoints } from './value-objects/CharacterHealthPoints';
import { CharacterId } from './value-objects/CharacterId';
import { CharacterIntelligence } from './value-objects/CharacterIntelligence';
import { CharacterJob } from './value-objects/CharacterJob';
import { CharacterName } from './value-objects/CharacterName';
import { CharacterSpeed } from './value-objects/CharacterSpeed';
import { CharacterStrength } from './value-objects/CharacterStrength';

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
      ),
    );

    return character;
  }

  protected calculateSpeed(): CharacterSpeed {
    return new CharacterSpeed(
      Math.round(
        [
          this.dexterity.toNumber() * this.calculateModifier(0, 0.6),
          this.intelligence.toNumber() * this.calculateModifier(0, 0.2),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }

  // having the defender as an arguments allows us to add defenses into the forumula
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected calculateDamage(defender: Character): CharacterHealthPoints {
    return new CharacterHealthPoints(
      Math.round(
        [
          this.strength.toNumber() * this.calculateModifier(0, 0.8),
          this.dexterity.toNumber() * this.calculateModifier(0, 0.2),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }
}
