import { ValueObject } from './ValueObject';
import { v4 as uuidv4 } from 'uuid';
import { StringIsNotValidUuidError } from './error/StringIsNotValidUuidError';

export class UuidIdentifier extends ValueObject {
  constructor(protected uuid: string) {
    super();
    if (!uuid.match(/^[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}$/)) {
      throw new StringIsNotValidUuidError(uuid);
    }
  }

  static generate(): UuidIdentifier {
    return this.fromString(uuidv4());
  }

  equals(other: UuidIdentifier): boolean {
    return this.uuid === other.uuid;
  }

  toString(): string {
    return this.uuid;
  }

  static fromString(string: string): UuidIdentifier {
    return new this(string);
  }
}
