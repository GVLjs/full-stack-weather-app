global.fetch = require("node-fetch")

const DarkSky = require("dark-sky")
const darksky = new DarkSky("b52afabf89943278803bb054c1bd48a8")
const Unsplash = require("unsplash-js").default
const { toJson } = require("unsplash-js")

const UNSPLASH_ACCESS_KEY =
  "f1ae43184b4642e37ecf568844e703ad63baa8ffc02b9e158c33a97db6fab493"
const UNSPLASH_SECRET_KEY =
  "5065092492d9fa90105bb43ab6e451f47d61c245cca83fe1fe6c4266df2461f5"

const unsplash = new Unsplash({
  applicationId: UNSPLASH_ACCESS_KEY,
  secret: UNSPLASH_SECRET_KEY
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
