import type { NextApiRequest, NextApiResponse } from "next";
import { flushCache } from "../../../lib/cacheForDev";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const keyCntFlushed = await flushCache();
  res.status(200).json({ keys: keyCntFlushed });
}
