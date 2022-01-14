// cache to be used only in development
import NodeCache from "node-cache";

const devCache = new NodeCache();
const TTL = 3600; // 1 hour

export function execFuncWithCacheOnDevOnly<Type>(
  key: string,
  func: () => Type
): Type {
  if (process.env.NODE_ENV !== "development") {
    return func();
  }

  if (devCache.has(key)) {
    console.info(`cache hit for key ${key}`);
    return devCache.get(key)!;
  }

  const res = func();
  if (!devCache.set(key, res, TTL)) {
    console.warn(`cache set for key ${key} failed`);
  }

  console.info(`cache missed for key ${key}`);
  return res;
}

export const flushCache = () => {
  if (process.env.NODE_ENV !== "development") {
    return 0;
  }

  const { keys: keyCnt } = devCache.getStats();
  devCache.flushAll();
  console.info(`${keyCnt} keys in cache flushed `);
  return keyCnt;
};
