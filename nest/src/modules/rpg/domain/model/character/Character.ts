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
import { CharacterSpeedModifier } from './value-objects/CharacterSpeedModifier';
import { CharacterDamageModifier } from './value-objects/CharacterDamageModifier';

export abstract class Character extends AggregateRoot {
  id: CharacterId;
  name: CharacterName;
  job: CharacterJob;
  maximumHealthPoints: CharacterHealthPoints;
  currentHealthPoints: CharacterHealthPoints;
  baseStrength: CharacterStrength;
  baseDexterity: CharacterDexterity;
  baseIntelligence: CharacterIntelligence;
  damageModifier: CharacterDamageModifier;
  speedModifier: CharacterSpeedModifier;
  isAlive: boolean;
  createdAt: CharacterCreatedAt;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create(id: CharacterId, name: CharacterName): Character {
    throw new Error('Not implemented');
  }

  prepareForAttack(): void {
    if (!this.isAlive) {
      // what is dead, cannot attack
      return;
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
        attacker.currentHealthPoints,
        this.id,
        this.name,
        this.currentHealthPoints.substract(damage),
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
    this.maximumHealthPoints = event.characterHealthPoints;
    this.currentHealthPoints = event.characterHealthPoints;
    this.baseStrength = event.characterStrength;
    this.baseDexterity = event.characterDexterity;
    this.baseIntelligence = event.characterIntelligence;
    this.damageModifier = event.damageModifier;
    this.speedModifier = event.speedModifier;
    this.isAlive = true;
    this.createdAt = CharacterCreatedAt.fromString(event.createdAt.toString());
  }

  protected whenCharacterWasAttacked(event: CharacterWasAttacked): void {
    this.currentHealthPoints = this.currentHealthPoints.substract(event.damage);
    this.isAlive =
      this.currentHealthPoints.compare(new CharacterHealthPoints(0)) === 1;
  }
}
