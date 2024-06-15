import { formatISO, parseISO } from 'date-fns';
import { ValueObject } from './ValueObject';

export class DateValueObject extends ValueObject {
  constructor(protected date: Date) {
    super();
  }

  static now(): DateValueObject {
    return new DateValueObject(new Date());
  }

  static fromString(date: string): DateValueObject {
    return new this(parseISO(date));
  }

  toString(): string {
    return formatISO(this.date);
  }
}
