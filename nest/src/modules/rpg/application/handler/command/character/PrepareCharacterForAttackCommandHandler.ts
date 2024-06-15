import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { PrepareCharacterForAttackCommand } from 'src/modules/rpg/domain/model/character/command/PrepareCharacterForAttackCommand';

@CommandHandler(PrepareCharacterForAttackCommand)
export class PrepareCharacterForAttackCommandHandler
  implements ICommandHandler<PrepareCharacterForAttackCommand>
{
  constructor(@Inject(Characters) private readonly characters: Characters) {}

  async execute(command: PrepareCharacterForAttackCommand): Promise<void> {
    const character = (
      await this.characters.get(command.characterId)
    ).extract() as Character;

    character.prepareForAttack();

    await this.characters.update(character);
  }
}
