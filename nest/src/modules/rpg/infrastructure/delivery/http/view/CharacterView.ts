export class CharacterView {
  constructor(
    public id: string,
    public name: string,
    public job: string,
    public maximumHealthPoints: number,
    public currentHealthPoints: number,
    public baseStrength: number,
    public baseDexterity: number,
    public baseIntelligence: number,
    public damageModifier: string,
    public speedModifier: string,
    public isAlive: boolean,
    public createdAt: string,
  ) {}
}
