export const newID = () => {
  return Math.random().toString(36).substring(2, 16);
};

export const getErrorMessage = (err: unknown) => {
  if (err instanceof Error) return err.message;
  return String(err);
};
