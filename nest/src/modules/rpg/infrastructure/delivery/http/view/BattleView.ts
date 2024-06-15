import { BaseEvent } from 'src/lib/common/domain/model/BaseEvent';

export type CharacterView = {
  id: string;
  attackerId: string;
  attackerName: string;
  defenderId: string;
  defenderName: string;
  state: string;
  createdAt: string;
  battleLog: BaseEvent[];
};
