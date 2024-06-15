import { QueryCreatedAt } from './value-object/QueryCreatedAt';
import { QueryId } from './value-object/QueryId';

export abstract class BaseQuery {
  constructor(
    public queryId: QueryId = QueryId.generate(),
    public createdAt: QueryCreatedAt = QueryCreatedAt.now(),
  ) {}
}
