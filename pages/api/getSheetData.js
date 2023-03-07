export default async function handler(req, res) {
  const fetchData = await fetch("https://api.sheetson.com/v2/sheets/Data", {
    headers: {
      Authorization: `Bearer ${process.env.SHEETSON_BEARER}`,
      "X-Spreadsheet-Id": process.env.SHEETSON_ID,
    },
  });
  const data = await fetchData.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(data);
}
