import React from "react"
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import gql from "graphql-tag"
import ApolloClient from "apollo-boost"
import { ApolloProvider, Query } from "react-apollo"
import { Location, Permissions } from "expo"

const client = new ApolloClient({ uri: "https://full-stack-weather.now.sh/" })

const WEATHER_QUERY = gql`
  query WeatherQuery($lng: Float!, $lat: Float!) {
    weather(lng: $lng, lat: $lat) {
      summary
      icon
      precipIntensity
      temperature
      apparentTemperature
      photo {
        width
        height
        regular
      }
    }
  }
`

class App extends React.Component {
  state = {
    location: null,
  }

  async componentDidMount() {
    await Permissions.askAsync(Permissions.LOCATION)
    const location = await Location.getCurrentPositionAsync({})
    this.setState({ location })
  }

  render() {
    const { location } = this.state

    if (!location) {
      return null
    }

    return (
      <ApolloProvider client={client}>
        <Query
          query={WEATHER_QUERY}
          variables={{
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          }}>
          {({ loading, error, data }) => {
            if (loading) return <ActivityIndicator />
            if (error) return <Text>Error! {error.message}</Text>

            return (
              <View style={styles.screen}>
                <StatusBar barStyle="light-content" />
                <ImageBackground
                  source={{ uri: data.weather.photo.regular }}
                  resizeMode="cover"
                  style={styles.backgroundImage}>
                  <View style={styles.container}>
                    <SafeAreaView>
                      <Text style={styles.locationText}>
                        {"Greenville, SC".toUpperCase()}
                      </Text>
                      <Text style={styles.summaryText}>
                        {data.weather.summary}
                      </Text>
                      <Text style={styles.temperatureText}>
                        {data.weather.temperature}°
                      </Text>
                    </SafeAreaView>
                  </View>
                </ImageBackground>
              </View>
            )
          }}
        </Query>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 200,
  },
  locationText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 24,
  },
  summaryText: {
    color: "white",
    fontSize: 24,
  },
  temperatureText: {
    color: "white",
    fontSize: 100,
  },
})

export default App
