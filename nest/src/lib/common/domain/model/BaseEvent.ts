import { EventCreatedAt } from './value-object/EventCreatedAt';
import { EventId } from './value-object/EventId';

export abstract class BaseEvent {
  constructor(
    public eventId: EventId = EventId.generate(),
    public createdAt: EventCreatedAt = EventCreatedAt.now(),
  ) {}
}
