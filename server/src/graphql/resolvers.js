import resolveWeather from "../api/darksky"
import resolveWeatherPhoto from "../api/unplash"
import resolveLocation from "../api/mapbox"

const resolvers = {
  Query: {
    weather: async (_, args) => {
      // get the weather from darksky
      const weather = await resolveWeather(args.lng, args.lat)
      return {
        ...weather,
        photo: resolveWeatherPhoto(weather),
        location: resolveLocation(args.lng, args.lat)
      }
    }
  }
}

export default resolvers
