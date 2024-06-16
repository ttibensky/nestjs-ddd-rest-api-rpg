import { Character } from './Character';
import { CharacterType } from './CharacterType';
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

  static getClass(job: CharacterJob): CharacterType {
    const jobs = CharacterFactory.jobs();

    if (!jobs.has(job)) {
      throw new Error(`Unknown character job "${job}"`);
    }

    return jobs.get(job);
  }

  static jobs(): Map<CharacterJob, CharacterType> {
    const map = new Map();

    map.set(CharacterJob.Warrior, Warrior);
    map.set(CharacterJob.Thief, Thief);
    map.set(CharacterJob.Mage, Mage);

    return map;
  }
}
