import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Character } from 'src/modules/rpg/domain/model/character/Character';
import { Characters } from 'src/modules/rpg/domain/model/character/Characters';
import { AttackCharacterCommand } from 'src/modules/rpg/domain/model/character/command/AttackCharacterCommand';

@CommandHandler(AttackCharacterCommand)
export class AttackCharacterCommandHandler
  implements ICommandHandler<AttackCharacterCommand>
{
  constructor(@Inject(Characters) private readonly characters: Characters) {}

  async execute(command: AttackCharacterCommand): Promise<void> {
    const character = (
      await this.characters.get(command.characterId)
    ).extract() as Character;
    const attacker = (
      await this.characters.get(command.attackerId)
    ).extract() as Character;

    character.attack(attacker);

    await this.characters.update(character);
  }
}
