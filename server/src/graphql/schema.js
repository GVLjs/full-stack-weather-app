const { gql } = require("apollo-server")

module.exports = gql`
  type PhotoLocation {
    title: String
    name: String
    city: String
    country: String
  }

  type Photo {
    color: String
    width: Int
    height: Int
    full: String
    regular: String
    location: PhotoLocation
  }

  type Location {
    city: String
    state: String
    country: String
  }

  type Weather @cacheControl(maxAge: 60) {
    summary: String
    icon: String
    temperature: Float
    humidity: Float
    apparentTemperature: Float
    precipIntensity: Float
    precipProbability: Float
    photo: Photo @cacheControl(maxAge: 60)
    location: Location
  }

  type Query {
    weather(lng: Float!, lat: Float!): Weather
  }
`
