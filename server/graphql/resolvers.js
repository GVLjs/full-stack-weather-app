global.fetch = require("node-fetch")

const DarkSky = require("dark-sky")
const darksky = new DarkSky(process.env.DARKSKY_API_KEY)
const Unsplash = require("unsplash-js").default
const { toJson } = require("unsplash-js")

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

const resolvers = {
  Query: {
    weather: async (_, args) => {
      // get the weather from darksky
      const data = await darksky
        .options({ latitude: args.lat, longitude: args.lng })
        .get()
      const weather = data.currently
      return {
        ...weather,
        photo: resolveWeatherPhoto(weather)
      }
    }
  }
}

module.exports = resolvers
