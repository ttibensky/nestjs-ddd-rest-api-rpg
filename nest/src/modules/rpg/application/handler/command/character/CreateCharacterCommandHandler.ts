import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CharacterFactory } from 'src/modules/rpg/domain/model/character/CharacterFactory';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { CreateCharacterCommand } from 'src/modules/rpg/domain/model/character/command/CreateCharacterCommand';

@CommandHandler(CreateCharacterCommand)
export class CreateCharacterCommandHandler
  implements ICommandHandler<CreateCharacterCommand>
{
  constructor(@Inject(Characters) private readonly characters: Characters) {}

  async execute(command: CreateCharacterCommand): Promise<void> {
    await this.characters.create(
      CharacterFactory.create(
        command.characterJob,
        command.characterId,
        command.characterName,
      ),
    );
  }
}
