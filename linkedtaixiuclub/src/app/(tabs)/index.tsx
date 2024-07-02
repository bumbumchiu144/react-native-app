import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import PostListItem from "@/components/PostListItem";
// import posts from "../../../assets/data/posts.json";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const postList = gql`
  query PostListQuery {
    postList {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

const postPaginatedList = gql`
  query PostPaginatedListQuery($first: Int, $after: Int) {
    postPaginatedList(first: $first, after: $after) {
      id
      content
      image
      profile {
        id
        name
        position
        image
      }
    }
  }
`;

export default function HomeFeedScreen() {
  const [hasMore, setHasMore] = useState(true);

  const { loading, error, data, fetchMore, refetch } = useQuery(
    postPaginatedList,
    {
      variables: { first: 150 },
    }
  );

  const loadMore = async () => {
    if (!hasMore) {
      return;
    }

    const res = await fetchMore({
      variables: { after: data.postPaginatedList.length },
    });

    if (res.data.postPaginatedList.length === 0) {
      setHasMore(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.containerAc}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textac}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <FlatList
      data={data.postPaginatedList}
      keyExtractor={(item, index) => item.id + "-" + index}
      renderItem={({ item }) => <PostListItem post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 10 }}
      onEndReached={loadMore}
      refreshing={loading}
      onRefresh={refetch}
      ListFooterComponent={() => (
        <Text
          onPress={loadMore}
          style={{
            alignSelf: "center",
            fontWeight: 600,
            fontSize: 16,
            color: "royalblue",
          }}
        >
          Load more
        </Text>
      )}
    />
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
