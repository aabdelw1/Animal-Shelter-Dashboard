import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'

function createClient ({ headers }) {
  return new ApolloClient({
    uri: 'http://localhost:4000/animals',
    request: operation => {
      operation.setContext({
        headers
      })
    }
  })
}

export default withApollo(createClient)
