const { gql } = require("apollo-server")

module.exports = gql`
  type Forecast {
    summary: String
    icon: String
    temperature: Float
    humidity: Float
    apparentTemperature: Float
    precipIntensity: Float
    precipProbability: Float
  }

  type Query {
    forecast(lng: Float!, lat: Float!): Forecast
  }
`
