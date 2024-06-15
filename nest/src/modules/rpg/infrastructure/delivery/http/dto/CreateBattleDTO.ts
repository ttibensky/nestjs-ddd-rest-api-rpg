import { IsNotEmpty } from 'class-validator';

export class CreateBattleDTO {
  // @TODO validate the string is UUID
  @IsNotEmpty()
  readonly attackerId: string;

  // @TODO validate the string is UUID
  @IsNotEmpty()
  readonly defenderId: string;
}
