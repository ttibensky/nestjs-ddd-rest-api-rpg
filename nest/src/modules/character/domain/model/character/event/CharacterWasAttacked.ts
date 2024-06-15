import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';
import { CharacterHealthPoints } from '../value-objects/CharacterHealthPoints';
import { CharacterId } from '../value-objects/CharacterId';
import { CharacterName } from '../value-objects/CharacterName';

export class CharacterWasAttacked extends BaseEvent {
  constructor(
    public attackerId: CharacterId,
    public attackerName: CharacterName,
    public attackerHealthPoints: CharacterHealthPoints,
    public defenderId: CharacterId,
    public defenderName: CharacterName,
    public defenderHealthPoints: CharacterHealthPoints, // after this attack
    public damage: CharacterHealthPoints,
  ) {
    super();
  }
}
