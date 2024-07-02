import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import users from "../../assets/data/users.json";
import UserListItem from "@/components/UserListItem";
import { useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

const query = gql`
  query profileSearch($term: String) {
    profileSearch(term: $term) {
      id
      image
      name
      position
    }
  }
`;

export default function SearchScreem() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { term: `%${search}%` },
  });

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search users",
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        // onBlur: () => {
        //   console.warn('Sarching');
        //   handleSearch();
        // },
      },
    });
  }, [navigation]);

  if (loading && !data?.profileSearch) {
    return (
      <View style={styles.containerAc}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textac}>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return <Text>Something went wrong ...</Text>;
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        contentContainerStyle={{ marginTop: 30 }}
        data={data?.profileSearch || []}
        renderItem={({ item }) => <UserListItem user={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerAc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textac: {
    marginTop: 10,
    fontSize: 16,
    color: '#0000ff',
    textAlign: 'center'
  },
});
