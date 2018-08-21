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

module.exports = resolveWeatherPhoto
