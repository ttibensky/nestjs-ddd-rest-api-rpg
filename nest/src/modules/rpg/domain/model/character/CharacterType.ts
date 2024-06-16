import { Mage } from './Mage';
import { Thief } from './Thief';
import { Warrior } from './Warrior';

export type CharacterType = typeof Warrior | typeof Thief | typeof Mage;
