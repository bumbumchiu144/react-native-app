import { Text, ScrollView, ActivityIndicator, View, StyleSheet } from "react-native";
import posts from "../../../assets/data/posts.json";
import PostListItem from "@/components/PostListItem";
import { useLocalSearchParams } from "expo-router";
import { gql, useQuery } from "@apollo/client";
import PostItem from "@/components/PostItem";

const query = gql`
  query MyQuery($id: ID!) {
    post(id: $id) {
      content
      id
      image
      profile {
        id
        name
        image
        position
      }
    }
  }
`;

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } = useQuery(query, { variables: { id } });

  if (loading) {
    return (
      <View style={styles.containerAc}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textac}>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <PostItem post={data.post} />
    

    // <ScrollView>
    //   <PostListItem post={data.post} />
    // </ScrollView>
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