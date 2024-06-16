export class CharacterJobStatsView {
  constructor(
    public job: string,
    public maximumHealthPoints: string,
    public baseStrength: string,
    public baseDexterity: string,
    public baseIntelligence: string,
    public damageModifier: string,
    public speedModifier: string,
  ) {}
}
