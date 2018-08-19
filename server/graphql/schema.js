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

  type Weather {
    summary: String
    icon: String
    temperature: Float
    humidity: Float
    apparentTemperature: Float
    precipIntensity: Float
    precipProbability: Float
    photo: Photo
  }

  type Query {
    weather(lng: Float!, lat: Float!): Weather
  }
`
