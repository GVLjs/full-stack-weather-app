const DarkSky = require("dark-sky")
const darksky = new DarkSky(process.env.DARKSKY_API_KEY)

const resolveWeather = async (lng, lat) => {
  const data = await darksky
    .options({
      latitude: args.lat,
      longitude: args.lng,
      exclude: ["minutely", "hourly", "daily", "alerts", "flags"]
    })
    .get()
  return data.currently
}

module.exports = resolveWeather
