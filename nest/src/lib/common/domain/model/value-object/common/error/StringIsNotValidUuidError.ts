export class StringIsNotValidUuidError extends Error {
  constructor(notUuid: string) {
    super(`String "${notUuid} is not a valid UUID v4"`);
  }
}
