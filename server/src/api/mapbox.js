import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding"

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAPBOX_API_KEY
})

const resolveLocation = async (lng, lat) => {
  try {
    const result = await geocodingClient
      .reverseGeocode({
        query: [lng, lat],
        limit: 1
      })
      .send()

    const context = result.body.features[0].context
    const city = context.filter(c => c.id.indexOf("place") > -1)[0].text
    const country = context.filter(c => c.id.indexOf("country") > -1)[0].text
    const state = context.filter(c => c.id.indexOf("region") > -1)[0].text
    return { city, country, state }
  } catch (error) {
    console.log("error getting location: ", error)
  }
}

export default resolveLocation
