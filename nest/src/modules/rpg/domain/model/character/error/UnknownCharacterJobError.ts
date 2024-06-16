import { CharacterJob } from '../value-objects/CharacterJob';

export class UnknownCharacterJobError extends Error {
  constructor(job: CharacterJob) {
    super(`Unknown character job "${job}"`);
  }
}
