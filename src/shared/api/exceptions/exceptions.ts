export class ValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class MinimalRangeError extends Error {
  public constructor(message: string) {
    super(message);
    this.message = message;
  }
}
