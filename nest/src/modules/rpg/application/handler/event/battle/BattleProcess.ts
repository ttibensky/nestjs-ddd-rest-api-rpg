import { Logger } from '@nestjs/common';
import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { EndBattleCommand } from 'src/modules/rpg/domain/model/battle/command/EndBattleCommand';
import { BattleHasEnded } from 'src/modules/rpg/domain/model/battle/event/BattleHasEnded';
import { BattleWasCreated } from 'src/modules/rpg/domain/model/battle/event/BattleWasCreated';
import { BattleId } from 'src/modules/rpg/domain/model/battle/value-object/BattleId';
import { AttackCharacterCommand } from 'src/modules/rpg/domain/model/character/command/AttackCharacterCommand';
import { PrepareCharacterForAttackCommand } from 'src/modules/rpg/domain/model/character/command/PrepareCharacterForAttackCommand';
import { CharacterPreparedForAttack } from 'src/modules/rpg/domain/model/character/event/CharacterPreparedForAttack';
import { CharacterWasAttacked } from 'src/modules/rpg/domain/model/character/event/CharacterWasAttacked';
import { CharacterHealthPoints } from 'src/modules/rpg/domain/model/character/value-objects/CharacterHealthPoints';
import { CharacterId } from 'src/modules/rpg/domain/model/character/value-objects/CharacterId';
import { CharacterSpeed } from 'src/modules/rpg/domain/model/character/value-objects/CharacterSpeed';

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
@EventsHandler(
  BattleWasCreated,
  CharacterPreparedForAttack,
  CharacterWasAttacked,
  BattleHasEnded,
)
export class BattleProcess implements IEventHandler<BaseEvent> {
  private attackerId: CharacterId;
  private attackerSpeed: CharacterSpeed = null;
  private defenderId: CharacterId;
  private defenderSpeed: CharacterSpeed = null;
  private battleId: BattleId;
  private battleLog: BaseEvent[] = []; // @TODO write every event into the Battle aggregate and persist it after each one
  private battleHasEnded: boolean = false;
  private readonly logger: Logger;

  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(BattleProcess.name);
  }

  handle(event: BaseEvent) {
    this.logger.debug(
      `Handling domain event "${event.constructor.name}": ${JSON.stringify(event)}`,
    );

    switch (true) {
      case event instanceof BattleWasCreated:
        this.onBattleWasCreated(event);
        break;
      case event instanceof CharacterPreparedForAttack:
        this.onCharacterPreparedForAttack(event);
        break;
      case event instanceof CharacterWasAttacked:
        this.onCharacterWasAttacked(event);
        break;
      case event instanceof BattleHasEnded:
        this.onBattleHasEnded(event);
        break;
      default:
        throw new Error(
          `Cannot find handler for event "${event.constructor.name}"`,
        );
    }

    this.logger.debug(
      `Successfully handled domain event "${event.constructor.name}": ${JSON.stringify(event)}`,
    );
  }

  // in the real world scenario, we would start the process here
  private onBattleWasCreated(event: BattleWasCreated): void {
    this.battleLog.push(event);

    this.attackerId = event.attackerId;
    this.defenderId = event.defenderId;
    this.battleId = event.battleId;

    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.attackerId),
    );
    this.commandBus.execute(
      new PrepareCharacterForAttackCommand(this.defenderId),
    );
  }

  private async onCharacterPreparedForAttack(
    event: CharacterPreparedForAttack,
  ): Promise<void> {
    this.battleLog.push(event);

    if (event.characterId.equals(this.attackerId)) {
      this.attackerSpeed = event.characterSpeed;
    }

    if (event.characterId.equals(this.defenderId)) {
      this.defenderSpeed = event.characterSpeed;
    }

    if (this.attackerSpeed === null || this.defenderSpeed === null) {
      // characters are still getting ready to attack
      return;
    }

    const attackersAttack = () =>
      new AttackCharacterCommand(this.attackerId, this.defenderId);
    const defendersAttack = () =>
      new AttackCharacterCommand(this.defenderId, this.attackerId);

    if (this.attackerSpeed.compare(this.defenderSpeed) === 1) {
      await this.commandBus.execute(attackersAttack());
      if (!this.battleHasEnded) {
        await this.commandBus.execute(defendersAttack());
      }

      return;
    }

    await this.commandBus.execute(attackersAttack());
    if (!this.battleHasEnded) {
      await this.commandBus.execute(defendersAttack());
    }
  }

  private onCharacterWasAttacked(event: CharacterWasAttacked): void {
    this.battleLog.push(event);

    // reset both characters speed so they are able to prepare for the next attack
    if (event.attackerId.equals(this.attackerId)) {
      this.attackerSpeed = null;
    }

    if (event.attackerId.equals(this.defenderId)) {
      this.defenderSpeed = null;
    }

    if (
      event.defenderHealthPoints.compare(new CharacterHealthPoints(0)) === 0
    ) {
      // battle has ended, one of the characters died
      this.commandBus.execute(
        new EndBattleCommand(this.battleId, this.battleLog),
      );

      // in the real world scenario, we would finish the process here
      return;
    }

    if (this.attackerSpeed !== null || this.defenderSpeed !== null) {
      // characters are still attacking
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onBattleHasEnded(event: BattleHasEnded): void {
    this.battleHasEnded = true;
  }
}
