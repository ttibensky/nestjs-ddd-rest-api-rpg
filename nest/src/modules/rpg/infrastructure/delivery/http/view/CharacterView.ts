export class CharacterView {
  id: string;
  name: string;
  job: string;
  healthPoints: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  isAlive: boolean;
  createdAt: string;

  constructor(
    id: string,
    name: string,
    job: string,
    healthPoints: number,
    strength: number,
    dexterity: number,
    intelligence: number,
    isAlive: boolean,
    createdAt: string,
  ) {
    this.id = id;
    this.name = name;
    this.job = job;
    this.healthPoints = healthPoints;
    this.strength = strength;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.isAlive = isAlive;
    this.createdAt = createdAt;
  }
}
