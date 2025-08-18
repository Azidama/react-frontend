import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
})

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.some(err => err.extensions?.code === 'UNAUTHENTICATED')) {
    window.location.href = '/login'
  }
})

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})

export default client
