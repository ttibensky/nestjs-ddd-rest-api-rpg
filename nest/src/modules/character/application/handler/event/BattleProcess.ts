import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CreateBattleCommand } from 'src/modules/character/domain/model/battle/command/CreateBattleCommand';
import { EndBattleCommand } from 'src/modules/character/domain/model/battle/command/EndBattleCommand';
import { BattleWasCreated } from 'src/modules/character/domain/model/battle/event/BattleWasCreated';
import { AttackCharacterCommand } from 'src/modules/character/domain/model/character/command/AttackCharacterCommand';
import { PrepareCharacterForAttackCommand } from 'src/modules/character/domain/model/character/command/PrepareCharacterForAttackCommand';
import { CharacterPreparedForAttack } from 'src/modules/character/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/character/domain/model/character/event/CharacterWasAttacked';
import { CharacterHealthPoints } from 'src/modules/character/domain/model/character/value-objects/CharacterHealthPoints';
import { CharacterId } from 'src/modules/character/domain/model/character/value-objects/CharacterId';
import { CharacterSpeed } from 'src/modules/character/domain/model/character/value-objects/CharacterSpeed';

/**
 * This class is a process.
 * In a real-world scenario, the process should be persisted into a database.
 *
 * The process should also be associated with the entities its working working with, on the database level.
 * In this case it would be associated with the attacker and the defender characters.
 *
 * When the BattleWasCreated occurs, the process manager will start the process (create a new database record)
 * and associate the process the attacker and the defender characters.
 *
 * Then, when an event (such as CharacterWasAttacked) occurs, the process manager will
 * look for existing process with the association to that particular 2 characters in the database,
 * it will instantiate the process class, and call the respective method in the same way we use event handlers.
 *
 * The process and the process manager ensures that there can be only one ongoing battle at any given time
 * that includes associated characters, and it also guarantees the execution order of all adjacent event handlers.
 */
export class BattleProcess {
  attackerId: CharacterId;
  attackerSpeed: CharacterSpeed = null;
  defenderId: CharacterId;
  defenderSpeed: CharacterSpeed = null;
  battleLog: BaseEvent[] = [];

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  // in the real world scenario, we would start the process here
  onBattleWasCreated(event: BattleWasCreated): void {
    this.battleLog.push(event);

    this.attackerId = event.attackerId;
    this.defenderId = event.defenderId;

    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.attackerId),
    );
    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.defenderId),
    );
  }

  onCharacterPreparedForAttack(event: CharacterPreparedForAttack): void {
    this.battleLog.push(event);

    if (event.characterId === this.attackerId) {
      this.attackerSpeed = event.characterSpeed;
    }

    if (event.characterId === this.defenderId) {
      this.defenderSpeed = event.characterSpeed;
    }

    if (this.attackerSpeed === null || this.defenderSpeed === null) {
      // characters are still getting ready to attack
      return;
    }

    this.commandBus.execute(
      this.attackerSpeed.compare(this.defenderSpeed) === 1
        ? new AttackCharacterCommand(this.attackerId, this.defenderId)
        : new AttackCharacterCommand(this.defenderId, this.attackerId),
    );
  }

  onCharacterWasAttacked(event: CharacterWasAttacked): void {
    this.battleLog.push(event);

    // reset both characters speed so they are able to prepare for the next attack
    this.attackerSpeed = null;
    this.defenderSpeed = null;

    if (
      event.defenderHealthPoints.compare(new CharacterHealthPoints(0)) === 0
    ) {
      // battle has ended, defender died
      console.log(this.battleLog);
      this.commandBus.execute(
        new EndBattleCommand(this.attackerId, this.defenderId, this.battleLog),
      );

      // in the real world scenario, we would finish the process here
      return;
    }

    // proceed to next round of peparation and attack
    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.attackerId),
    );
    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.defenderId),
    );
  }
}
