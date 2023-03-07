export default async function handler(req, res) {
  const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${req.query.zip},us&units=imperial&appid=${process.env.WEATHER_API_KEY}`;
  const response = await fetch(WEATHER_URL);
  const info = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=43200"
  );

  return res.status(200).json(info);
}
