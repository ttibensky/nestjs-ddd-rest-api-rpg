import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { Character } from '../character/Character';
import { AggregateRoot } from 'src/lib/common/domain/model/AggregateRoot';
import { CharacterId } from '../character/value-objects/CharacterId';
import { BattleWasCreated } from './event/BattleWasCreated';
import { BattleCreatedAt } from './value-object/BattleCreatedAt';
import { BattleState } from './value-object/BattleState';
import { BattleHasEnded } from './event/BattleHasEnded';
import { BattleId } from './value-object/BattleId';
import { CharacterName } from '../character/value-objects/CharacterName';

// we might want to persist the battle with all battle log in the database in the future
export class Battle extends AggregateRoot {
  id: BattleId;
  attackerId: CharacterId;
  attackerName: CharacterName;
  defenderId: CharacterId;
  defenderName: CharacterName;
  state: BattleState;
  createdAt: BattleCreatedAt;
  battleLog: BaseEvent[];

  // constructor(
  //   public attackerId: CharacterId,
  //   public defenderId: CharacterId,
  // ) {
  //   super();
  // }

  static create(
    id: BattleId,
    attacker: Character,
    defender: Character,
  ): Battle {
    const battle = new Battle();

    battle.recordThat(
      new BattleWasCreated(
        id,
        attacker.id,
        attacker.name,
        defender.id,
        defender.name,
      ),
    );

    return battle;
  }

  endBattle(battleLog: BaseEvent[]): void {
    this.recordThat(new BattleHasEnded(this.id, battleLog));
  }

  protected applyDomainEvent(event: BaseEvent): void {
    switch (true) {
      case event instanceof BattleWasCreated:
        this.whenBattleWasCreated(event);
        break;
      case event instanceof BattleHasEnded:
        this.whenBattleHasEnded(event);
        break;
      default:
        throw new Error(`Unsupported event "${event.constructor.name}"`);
    }
  }

  protected whenBattleWasCreated(event: BattleWasCreated): void {
    this.id = event.battleId;
    this.attackerId = event.attackerId;
    this.attackerName = event.attackerName;
    this.defenderId = event.defenderId;
    this.defenderName = event.defenderName;
    this.state = BattleState.Ongoing;
    this.createdAt = BattleCreatedAt.fromString(event.createdAt.toString());
  }

  protected whenBattleHasEnded(event: BattleHasEnded): void {
    this.battleLog = event.battleLog.map((event: BaseEvent) => ({
      eventName: event.constructor.name,
      ...event,
    }));
    this.state = BattleState.Ended;
  }
}
