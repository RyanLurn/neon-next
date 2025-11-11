interface BaseError {
  context?: Record<string, unknown>;
  timestamp: string;
  location: string;
  message: string;
  kind: string;
}

interface NotAuthenticatedError extends BaseError {
  kind: "not-authenticated";
}

interface AuthLibraryError extends BaseError {
  kind: "auth-library";
}

interface UnexpectedError extends BaseError {
  kind: "unexpected";
}

export type {
  NotAuthenticatedError,
  AuthLibraryError,
  UnexpectedError,
  BaseError,
};
