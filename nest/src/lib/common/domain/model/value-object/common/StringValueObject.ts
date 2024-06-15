import { ValueObject } from './ValueObject';

export abstract class StringValueObject extends ValueObject {
  constructor(protected value: string) {
    super();
  }

  toString(): string {
    return this.value;
  }
}
