import { NumberValueObject } from 'src/lib/common/domain/model/value-object/common/NumberValueObject';

export class CharacterHealthPoints extends NumberValueObject {
  public substract(healthPoints: CharacterHealthPoints): CharacterHealthPoints {
    return new CharacterHealthPoints(
      Math.max(this.value - healthPoints.value, 0),
    );
  }
}
