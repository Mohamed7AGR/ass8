const mainExeption = (message = "Internal server error", cause) => {
  throw new Error(message, { cause });
};

export const notFoundExeption = (message = "Not found") => {
  return mainExeption(message, 404);
};

export const unauthorizedExeption = (message = "Unauthorized") => {
  return mainExeption(message, 401);
};

export const badRequestExeption = (message = "Bad request") => {
  return mainExeption(message, 400);
};

export const forbiddenExeption = (message = "Forbidden") => {
  return mainExeption(message, 403);
};

export const conflictExeption = (message = "Conflict") => {
  return mainExeption(message, 409);
};

