import type { NextApiRequest, NextApiResponse } from "next";
import { flushCache } from "../../../lib/cacheForDev";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const keyCntFlushed = flushCache();
  res.status(200).json({ keys: keyCntFlushed });
}
