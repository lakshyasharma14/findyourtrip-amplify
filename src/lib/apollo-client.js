import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import jwt from "jsonwebtoken";

const link = createHttpLink({
  uri: process.env.GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const data = {
    name: "next auth server",
    admin: false,
    iat: Date.now() / 1000,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["auth_server"],
      "x-hasura-default-role": "auth_server",
    },
  };

  const encodedToken = jwt.sign(data, process.env.NEXTAUTH_SECRET, { algorithm: "HS256" });
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: "Bearer " + encodedToken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

export default client;
