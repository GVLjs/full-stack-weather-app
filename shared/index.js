import React from "react"

export function withData(Component) {
  return function() {
    return <Component data={{ foo: "bar" }} />
  }
}
