import DarkSky from "dark-sky"
const darksky = new DarkSky(process.env.DARKSKY_API_KEY)

const resolveWeather = async (lng, lat) => {
  const data = await darksky
    .options({
      latitude: lat,
      longitude: lng,
      time: new Date().getTime(),
      exclude: ["minutely", "hourly", "daily", "alerts", "flags"]
    })
    .get()
  return data.currently
}

export default resolveWeather
