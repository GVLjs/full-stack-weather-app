const DarkSky = require("dark-sky")
const darksky = new DarkSky("b52afabf89943278803bb054c1bd48a8")

export const getWeather = async (timeZone, point) => {
  const result = await darksky
    .options({
      latitude: point.location.lat,
      longitude: point.location.lng,
      language: "en",
      exclude: ["minutely", "hourly"]
    })
    .get()
  console.log("result: ")
  return result
}

const resolvers = {
  Query: {
    forecast: (_, args) => {}
  }
}

export default resolvers
