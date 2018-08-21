global.fetch = require("node-fetch")

const DarkSky = require("dark-sky")
const darksky = new DarkSky(process.env.DARKSKY_API_KEY)
const Unsplash = require("unsplash-js").default
const { toJson } = require("unsplash-js")
const gmapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})

const unsplash = new Unsplash({
  applicationId: process.env.UNSPLASH_ACCESS_KEY,
  secret: process.env.UNSPLASH_SECRET_KEY
})

const resolveWeatherPhoto = weather => async () => {
  const photoQuery = weather.icon.replace("-", " ")
  const photoResult = await toJson(
    await unsplash.photos.getRandomPhoto({
      query: photoQuery
    })
  )
  return { ...photoResult, ...photoResult.urls }
}

const resolveLocation = (lng, lat) => {
  return new Promise((resolve, reject) => {
    console.log("reverseGeocode:", [lng, lat])
    return gmapsClient.reverseGeocode(
      {
        latlng: [lat, lng]
      },
      (error, result) => {
        console.log("reverseGeocode?", error, result)
        if (error) return reject(error)
        console.log({ result })
        return resolve(result)
      }
    )
  })
}

const resolvers = {
  Query: {
    weather: async (_, args) => {
      // get the weather from darksky
      const data = await darksky
        .options({
          latitude: args.lat,
          longitude: args.lng,
          exclude: ["minutely", "hourly", "daily", "alerts", "flags"]
        })
        .get()
      console.log(JSON.stringify(data, null, 2))
      const weather = data.currently
      return {
        ...weather,
        photo: resolveWeatherPhoto(weather),
        location: resolveLocation(args.lng, args.lat)
      }
    }
  }
}

module.exports = resolvers
