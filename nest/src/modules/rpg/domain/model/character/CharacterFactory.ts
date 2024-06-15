import { Character } from './Character';
import { Mage } from './Mage';
import { Thief } from './Thief';
import { Warrior } from './Warrior';
import { CharacterId } from './value-objects/CharacterId';
import { CharacterJob } from './value-objects/CharacterJob';
import { CharacterName } from './value-objects/CharacterName';

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
