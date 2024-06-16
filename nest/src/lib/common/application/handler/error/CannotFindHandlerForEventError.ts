export class CannotFindHandlerForEventError extends Error {
  constructor(eventName: string) {
    super(`Cannot find handler for event "${eventName}"`);
  }
}
