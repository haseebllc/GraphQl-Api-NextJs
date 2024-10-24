// apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/api/graphql/proxy", // Point to your proxy route
});

const authLink = setContext((_, { headers }) => {
  return { headers };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine auth link with http link
  cache: new InMemoryCache(),
});

export default client;
