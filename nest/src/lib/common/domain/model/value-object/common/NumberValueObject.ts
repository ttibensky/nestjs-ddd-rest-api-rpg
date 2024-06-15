import { ValueObject } from './ValueObject';

export class NumberValueObject extends ValueObject {
  constructor(protected value: number) {
    super();
  }

  /**
   * Returns 0 if the numbers are equal, 1 if the number is bigger that other number, -1 otherwise.
   */
  compare(other: NumberValueObject): number {
    if (this.value === other.value) {
      return 0;
    }

    if (this.value > other.value) {
      return 1;
    }

    return -1;
  }

  public add(other: NumberValueObject): NumberValueObject {
    return new NumberValueObject(Math.max(this.value - other.value, 0));
  }

  public substract(other: NumberValueObject): NumberValueObject {
    return new NumberValueObject(Math.max(this.value - other.value, 0));
  }

  toNumber(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString();
  }

  static fromString(value: string): NumberValueObject {
    return new this(parseInt(value));
  }
}
