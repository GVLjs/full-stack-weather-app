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

const resolvers = {
  Query: {
    weather: async (_, args) => {
      // get the weather from darksky
      const data = await darksky
        .options({ latitude: args.lat, longitude: args.lng })
        .get()
      const weather = data.currently

      // get a nice photo
      const photoQuery = weather.icon.replace("-", " ")
      console.log({ photoQuery })
      const photoResult = await toJson(
        await unsplash.photos.getRandomPhoto({
          query: photoQuery
        })
      )

      console.dir(photoResult)

      // mash it all together and return!
      return {
        ...weather,
        photo: { ...photoResult, ...photoResult.urls }
      }
    }
  }
}

module.exports = resolvers
