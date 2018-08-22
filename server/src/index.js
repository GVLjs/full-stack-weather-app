import "now-env"
import { ApolloServer } from "apollo-server"
import typeDefs from "./graphql/schema"
import resolvers from "./graphql/resolvers"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      "editor.cursorShape": "line"
    }
  },
  tracing: true,
  cacheControl: true,
  engine: {
    apiKey: process.env.ENGINE_API_KEY
  }
})

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen({ port: 8000 }).then(({ url }) => {
  console.log(`🚀 GraphQL ready at ${url}`)
})
