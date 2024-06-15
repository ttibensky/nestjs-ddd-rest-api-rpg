import { CommandCreatedAt } from './value-object/CommandCreatedAt';
import { CommandId } from './value-object/CommandId';

export abstract class BaseCommand {
  constructor(
    public commandId: CommandId = CommandId.generate(),
    public createdAt: CommandCreatedAt = CommandCreatedAt.now(),
  ) {}
}
