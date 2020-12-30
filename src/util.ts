export function unique<T>(array: T[] = []): T[] {
  return array.filter((item, pos, self) => {
    return self.indexOf(item) === pos;
  });
}

export function only<T, K extends keyof T>(
  object: T,
  keys: K | K[] | string[] = []
): Pick<T, K> {
  object = (object || {}) as T;
  keys = (Array.isArray(keys) ? keys : [keys]) as string[];

  return keys.reduce((result, key) => {
    result[key] = object[key];
    return result;
  }, {} as T);
}
