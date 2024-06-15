import { IsNotEmpty } from 'class-validator';

export class CreateCharacterDTO {
  // @TODO name must contain letters or _ (underscore) characters and have a length between 4 and 15 characters inclusive
  @IsNotEmpty()
  readonly name: string;

  // @TODO validate the string is valid enum value
  // @TODO job must be one of Warrior Thief or Mage
  @IsNotEmpty()
  readonly job: string;
}
