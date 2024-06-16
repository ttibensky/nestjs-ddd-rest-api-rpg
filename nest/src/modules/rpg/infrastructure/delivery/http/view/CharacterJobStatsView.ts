export class CharacterJobStatsView {
  constructor(
    public job: string,
    public maximumHealthPoints: number,
    public baseStrength: number,
    public baseDexterity: number,
    public baseIntelligence: number,
    public damageModifier: string,
    public speedModifier: string,
  ) {}
}
