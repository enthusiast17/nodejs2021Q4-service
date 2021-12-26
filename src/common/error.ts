class HttpError extends Error {
  statusCode: number;

  error: string;

  message: string;

  constructor(statusCode: number, error: string, message: string) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
  }
}

export { HttpError };
