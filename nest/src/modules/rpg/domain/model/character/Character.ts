import { AggregateRoot } from 'src/lib/common/domain/model/AggregateRoot';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterPreparedForAttack } from './event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from './event/CharacterWasAttacked';
import { CharacterWasCreated } from './event/CharacterWasCreated';
import { CharacterCreatedAt } from './value-objects/CharacterCreatedAt';
import { CharacterDexterity } from './value-objects/CharacterDexterity';
import { CharacterHealthPoints } from './value-objects/CharacterHealthPoints';
import { CharacterId } from './value-objects/CharacterId';
import { CharacterIntelligence } from './value-objects/CharacterIntelligence';
import { CharacterJob } from './value-objects/CharacterJob';
import { CharacterName } from './value-objects/CharacterName';
import { CharacterSpeed } from './value-objects/CharacterSpeed';
import { CharacterStrength } from './value-objects/CharacterStrength';

export abstract class Character extends AggregateRoot {
  id: CharacterId;
  name: CharacterName;
  job: CharacterJob;
  healthPoints: CharacterHealthPoints;
  // @TODO maximum health points, current health points
  strength: CharacterStrength;
  dexterity: CharacterDexterity;
  intelligence: CharacterIntelligence;
  // @TODO Battle modifiers
  isAlive: boolean;
  createdAt: CharacterCreatedAt;

  // @TODO once we have a projection for this aggregate root, we can set all properties visibility to private
  // the constructor must be public for the ODM to be able to hydrate models when reading from the database
  // constructor(
  //   public id: CharacterId,
  //   public name: CharacterName,
  //   public job: CharacterJob,
  //   public healthPoints: CharacterHealthPoints,
  //   public strength: CharacterStrength,
  //   public dexterity: CharacterDexterity,
  //   public intelligence: CharacterIntelligence,
  // ) {
  //   super();
  // }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create(id: CharacterId, name: CharacterName): Character {
    throw new Error('Not implemented');
  }

  prepareForAttack(): void {
    if (!this.isAlive) {
      throw new Error(`Character ${this.id} is dead`);
    }

    this.recordThat(
      new CharacterPreparedForAttack(this.id, this.name, this.calculateSpeed()),
    );
  }

  attack(attacker: Character): void {
    const damage = attacker.calculateDamage(this);

    this.recordThat(
      new CharacterWasAttacked(
        attacker.id,
        attacker.name,
        attacker.healthPoints,
        this.id,
        this.name,
        this.healthPoints.substract(damage),
        damage,
      ),
    );
  }

  protected abstract calculateSpeed(): CharacterSpeed;

  protected abstract calculateDamage(
    attacker: Character,
  ): CharacterHealthPoints;

  protected calculateModifier(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  protected applyDomainEvent(event: BaseEvent): void {
    switch (true) {
      case event instanceof CharacterWasCreated:
        this.whenCharacterWasCreated(event);
        break;
      case event instanceof CharacterWasAttacked:
        this.whenCharacterWasAttacked(event);
        break;
      case event instanceof CharacterPreparedForAttack:
        break;
      default:
        throw new Error(`Unsupported event "${event.constructor.name}"`);
    }
  }

  protected whenCharacterWasCreated(event: CharacterWasCreated): void {
    this.id = event.characterId;
    this.name = event.characterName;
    this.job = event.characterJob;
    this.healthPoints = event.characterHealthPoints;
    this.strength = event.characterStrength;
    this.dexterity = event.characterDexterity;
    this.intelligence = event.characterIntelligence;
    this.isAlive = true;
    this.createdAt = CharacterCreatedAt.fromString(event.createdAt.toString());
  }

  protected whenCharacterWasAttacked(event: CharacterWasAttacked): void {
    this.healthPoints = this.healthPoints.substract(event.damage);
    this.isAlive =
      this.healthPoints.compare(new CharacterHealthPoints(0)) === 1;
  }
}
