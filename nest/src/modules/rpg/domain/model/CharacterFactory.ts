import { Character } from './character/Character';
import { Mage } from './character/Mage';
import { Thief } from './character/Thief';
import { Warrior } from './character/Warrior';
import { CharacterId } from './character/value-objects/CharacterId';
import { CharacterJob } from './character/value-objects/CharacterJob';
import { CharacterName } from './character/value-objects/CharacterName';

export class CharacterFactory {
  static create(
    job: CharacterJob,
    id: CharacterId,
    name: CharacterName,
  ): Character {
    return this.getClass(job).create(id, name);
  }

  static getClass(
    job: CharacterJob,
  ): typeof Warrior | typeof Thief | typeof Mage {
    switch (true) {
      case job === CharacterJob.Warrior:
        return Warrior;
      case job === CharacterJob.Thief:
        return Thief;
      case job === CharacterJob.Mage:
        return Mage;
      default:
        throw new Error(`Unknown character job "${job}"`);
    }
  }
}
