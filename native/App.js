import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { withData } from "./shared"

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>{JSON.stringify(this.props.data, null, 2)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default withData(App)
