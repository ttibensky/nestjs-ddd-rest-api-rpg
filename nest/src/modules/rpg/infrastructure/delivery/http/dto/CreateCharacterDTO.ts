import { IsNotEmpty } from 'class-validator';

export class CreateCharacterDTO {
  @IsNotEmpty()
  readonly name: string;

  // @TODO validate the string is valid enum value
  @IsNotEmpty()
  readonly job: string;
}
