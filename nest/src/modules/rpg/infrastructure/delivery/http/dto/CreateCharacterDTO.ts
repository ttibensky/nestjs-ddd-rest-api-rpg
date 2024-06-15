import { IsEnum, IsNotEmpty, Matches } from 'class-validator';
import { CharacterJob } from 'src/modules/rpg/domain/model/character/value-objects/CharacterJob';

export class CreateCharacterDTO {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z_]{4,15}$/)
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(CharacterJob)
  readonly job: string;
}
