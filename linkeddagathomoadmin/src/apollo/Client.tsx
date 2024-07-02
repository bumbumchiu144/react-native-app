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
  uri: "https://odonasi.us-east-a.ibm.stepzen.net/api/joyous-platypus/graphql",
  headers: {
    Authorization:
      "apikey odonasi::local.net+1000::5038cd0b85e1315e840b5261f1704bee29dff3bd536e026baffe3f31ad2626b7",
  },
  cache: new InMemoryCache({ typePolicies}),
});

export default client;