import { EventCreatedAt } from './value-object/EventCreatedAt';
import { EventId } from './value-object/EventId';

export abstract class BaseEvent {
  eventName: string;

  constructor(
    public eventId: EventId = EventId.generate(),
    public createdAt: EventCreatedAt = EventCreatedAt.now(),
  ) {
    this.eventName = this.constructor.name;
  }
}
