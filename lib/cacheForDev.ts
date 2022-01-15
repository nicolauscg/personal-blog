// cache to be used only in development
import NodePersistCache from "node-persist";

await NodePersistCache.init({
  dir: "fsDevCache", // relative to root of project
  ttl: 3600 * 1000, // 1 hour
});

export async function execFuncWithCacheOnDevOnly<Type>(
  key: string,
  func: () => Promise<Type>
): Promise<Type> {
  if (process.env.NODE_ENV !== "development") {
    return func();
  }

  const cacheRes = await NodePersistCache.getItem(key);

  if (cacheRes) {
    console.info(`cache hit for key ${key}`);
    return cacheRes;
  }

  const funcRes = await func();
  NodePersistCache.set(key, funcRes);

  console.info(`cache missed for key ${key}`);
  return funcRes;
}

export async function flushCache() {
  if (process.env.NODE_ENV !== "development") {
    return 0;
  }

  const keyCntBef = await NodePersistCache.length();
  NodePersistCache.clear();
  const keyCntAft = await NodePersistCache.length();
  const keyCnt = keyCntAft - keyCntBef;
  console.info(`${keyCnt} keys in cache flushed `);
  return keyCnt;
}
