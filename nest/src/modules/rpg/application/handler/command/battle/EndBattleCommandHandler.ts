import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Battle } from 'src/modules/rpg/domain/model/battle/Battle';
import { Battles } from 'src/modules/rpg/domain/model/battle/Battles';
import { EndBattleCommand } from 'src/modules/rpg/domain/model/battle/command/EndBattleCommand';

@CommandHandler(EndBattleCommand)
export class EndBattleCommandHandler
  implements ICommandHandler<EndBattleCommand>
{
  constructor(@Inject(Battles) private readonly battles: Battles) {}

  async execute(command: EndBattleCommand): Promise<void> {
    const battle = (
      await this.battles.get(command.battleId)
    ).extract() as Battle;

    battle.end(command.battleLog);

    await this.battles.update(battle);
  }
}
