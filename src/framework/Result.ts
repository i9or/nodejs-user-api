export type Result<T, E = undefined> =
  | { ok: true; value: T }
  | { ok: false; error: E | undefined };

export const Ok = <T>(data: T): Result<T, never> => {
  return { ok: true, value: data };
};

export const Err = <E>(error?: E): Result<never, E> => {
  return { ok: false, error };
};

export const isOk = <T, E>(
  result: Result<T, E>,
): result is { ok: true; value: T } => {
  return result.ok === true;
};

export const isErr = <T, E>(
  result: Result<T, E>,
): result is { ok: false; error: E | undefined } => {
  return result.ok === false;
};
