export const handleError = (err: unknown): never => {
  if (err instanceof Error) {
    throw err;
  } else {
    throw new Error('An unknown error occurred');
  }
};
