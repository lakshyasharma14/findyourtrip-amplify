import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Used server and client side - can't use react hooks
export const register = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "YOUR_GQL_ENDPOINT",
  }),
  ssrMode: typeof window === "undefined",
});
