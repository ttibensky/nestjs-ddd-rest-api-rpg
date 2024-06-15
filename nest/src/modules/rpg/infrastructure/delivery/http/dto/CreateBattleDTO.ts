import { IsNotEmpty, Matches } from 'class-validator';

export class CreateBattleDTO {
  @IsNotEmpty()
  @Matches(/^[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}$/)
  readonly attackerId: string;

  @IsNotEmpty()
  @Matches(/^[\d\w]{8}-[\d\w]{4}-[\d\w]{4}-[\d\w]{4}-[\d\w]{12}$/)
  readonly defenderId: string;
}
