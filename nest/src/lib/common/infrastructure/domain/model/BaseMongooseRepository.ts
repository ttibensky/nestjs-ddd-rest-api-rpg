import { Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { AggregateRoot } from 'src/lib/common/domain/model/AggregateRoot';

export abstract class BaseMongooseRepository {
  private readonly logger: Logger;

  constructor(private readonly eventBus: EventBus) {
    this.logger = new Logger(BaseMongooseRepository.name);
  }

  protected dispatchEvents(aggregate: AggregateRoot): void {
    const generator = aggregate.shiftEvents();
    for (const event of generator) {
      if (event === undefined) {
        return;
      }

      this.logger.debug(
        `Publishing domain event "${event.constructor.name}": ${JSON.stringify(event)}`,
      );

      this.eventBus.publish(event);
    }
  }
}
