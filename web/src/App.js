import React, { Component } from "react"
import { withData } from "./shared"

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    )
  }
}

export default withData(App)
