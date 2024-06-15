import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { Battles } from 'src/modules/rpg/domain/model/battle/Battles';
import { CreateBattleCommand } from 'src/modules/rpg/domain/model/battle/command/CreateBattleCommand';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';

@CommandHandler(CreateBattleCommand)
export class CreateBattleCommandHandler
  implements ICommandHandler<CreateBattleCommand>
{
  constructor(
    @Inject(Characters) private readonly characters: Characters,
    @Inject(Battles) private readonly battles: Battles,
  ) {}

  async execute(command: CreateBattleCommand): Promise<void> {
    const attacker = (
      await this.characters.get(command.attackerId)
    ).extract() as Character;
    const defender = (
      await this.characters.get(command.defenderId)
    ).extract() as Character;

    await this.battles.create(
      Battle.create(command.battleId, attacker, defender),
    );
  }
}
