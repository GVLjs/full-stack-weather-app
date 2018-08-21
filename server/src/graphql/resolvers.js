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
      const weather = resolveWeather()
      return {
        ...weather,
        photo: resolveWeatherPhoto(weather),
        location: resolveLocationMB(args.lng, args.lat)
      }
    }
  }
}

module.exports = resolvers
