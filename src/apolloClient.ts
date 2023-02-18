import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export { client };
