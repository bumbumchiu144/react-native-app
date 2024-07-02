// Container component
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from "@apollo/client";

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      postPaginatedList: {
        keyArgs: false,
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        }
      }
    }
  }
}

const client = new ApolloClient({
  uri: "https://chatorkand.eu-central-a.ibm.stepzen.net/api/factual-penguin/graphql",
  headers: {
    Authorization:
      "apikey chatorkand::local.net+1000::edf8ffd10e9e788d55279b76c9ba22402c9181cc64fc4bf2067667fc86593763",
  },
  cache: new InMemoryCache({ typePolicies}),
});

export default client;