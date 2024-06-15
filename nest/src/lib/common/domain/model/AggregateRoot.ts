import { BaseEvent } from './BaseEvent';

export abstract class AggregateRoot {
  protected events: BaseEvent[] = [];

  // we are using a generator instead of returning an array
  // to force other developers to consume the events in the correct order
  *shiftEvents(): Generator<BaseEvent> {
    yield this.events.shift();
  }

  protected recordThat(event: BaseEvent): void {
    this.applyDomainEvent(event);

    this.events.push(event);
  }

  protected abstract applyDomainEvent(event: BaseEvent): void;
}
