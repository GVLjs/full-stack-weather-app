import Unsplash, { toJson } from "unsplash-js"

// polfill for fetch
global.fetch = require("node-fetch")

// see http://24ways.org/2010/calculating-color-contrast
const getContrastYIQ = hexcolor => {
  var r = parseInt(hexcolor.substr(0, 2), 16)
  var g = parseInt(hexcolor.substr(2, 2), 16)
  var b = parseInt(hexcolor.substr(4, 2), 16)
  var yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? "#000" : "#fff"
}

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

  return {
    ...photoResult,
    ...photoResult.urls,
    credit: `${photoResult.user.name} on Unsplash`,
    link: photoResult.links.html,
    location: photoResult.location ? photoResult.location.title : "",
    constrastColor: getContrastYIQ(photoResult.color)
  }
}

export default resolveWeatherPhoto
