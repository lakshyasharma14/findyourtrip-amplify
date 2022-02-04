import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const link = createHttpLink({
  uri: process.env.GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-hasura-admin-secret": process.env.X_HASURA_ADMIN_SECRET,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
