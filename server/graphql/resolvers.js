const DarkSky = require("dark-sky")
const darksky = new DarkSky("b52afabf89943278803bb054c1bd48a8")

const resolvers = {
  Query: {
    forecast: async (_, args) => {
      const data = await darksky
        .options({ latitude: args.lat, longitude: args.lng })
        .get()
      console.log("got data: ", data.currently)
      return data.currently
    }
  }
}

module.exports = resolvers
