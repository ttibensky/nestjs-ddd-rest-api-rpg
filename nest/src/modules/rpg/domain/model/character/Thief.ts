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

export class Thief extends Character {
  static create(id: CharacterId, name: CharacterName): Thief {
    const character = new Thief();

    character.recordThat(
      new CharacterWasCreated(
        id,
        name,
        CharacterJob.Thief,
        new CharacterHealthPoints(15),
        new CharacterStrength(4),
        new CharacterDexterity(10),
        new CharacterIntelligence(4),
      ),
    );

    return character;
  }

  protected calculateSpeed(): CharacterSpeed {
    return new CharacterSpeed(
      Math.round(
        [this.dexterity.toNumber() * this.calculateModifier(0, 0.8)].reduce(
          (prev, current) => prev + current,
          0,
        ) * 100,
      ) / 100,
    );
  }

  // having the defender as an arguments allows us to add defenses into the forumula
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected calculateDamage(defender: Character): CharacterHealthPoints {
    return new CharacterHealthPoints(
      Math.round(
        [
          this.strength.toNumber() * this.calculateModifier(0, 0.25),
          this.dexterity.toNumber() * this.calculateModifier(0, 1),
          this.dexterity.toNumber() * this.calculateModifier(0, 0.25),
        ].reduce((prev, current) => prev + current, 0),
      ),
    );
  }
}
