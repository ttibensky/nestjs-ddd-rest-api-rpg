import { ValueObject } from './ValueObject';
import { v4 as uuidv4 } from 'uuid';

export class UuidIdentifier extends ValueObject {
  constructor(protected uuid: string) {
    super();
    // @TODO validate
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