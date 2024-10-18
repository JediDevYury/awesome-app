export const handleError = (
  err: unknown,
  callback?: (error: Error) => void,
  accessor?: string,
): void => {
  if (err instanceof Error && callback) {
    callback(new Error(accessor ? `${accessor}: ${err.message}` : err.message));
  }

  return err instanceof Error ? console.error(err) : console.error('An error occurred:', err);
};

export const formatDateToTime = (date: Date) => {
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};
