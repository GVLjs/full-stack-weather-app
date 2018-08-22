const { gql } = require("apollo-server")

export default gql`
  type Photo {
    color: String
    constrastColor: String
    width: Int
    height: Int
    full: String
    regular: String
    location: String
    credit: String
    link: String
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
