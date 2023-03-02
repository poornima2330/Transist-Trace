import { getSelectedBusPredictions } from "../../lib/ctatracker";

export default async function handler(req, res) {
  const response = await getSelectedBusPredictions(
    req.query.selectedRoute,
    req.query.selectedStop
  );
  const info = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(info);
}
