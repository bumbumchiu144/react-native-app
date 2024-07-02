import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TextInput,
  FlatList,
} from "react-native";
import { Post } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useUserContext } from "@/context/UserContext";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigation, useRouter } from "expo-router";
import CommentPost from "./CommentPost";
import CommentListItem from "./CommentListItem";

const deletePostByAdmin = gql`
  mutation MyMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const deletePostUser = gql`
  mutation MyMutation($id: ID!, $userid: ID!) {
    deletePostUser(id: $id, userid: $userid) {
      id
    }
  }
`;

const commentUsingComment_postid_fkey = gql`
  query commentUsingComment_postid_fkey($id: ID!) {
    commentUsingComment_postid_fkey(id: $id) {
      id
      comment
      postid
      userid
      profile {
        about
        id
        image
        name
        position
      }
    }
  }
`;

type PostItemProps = {
  post: Post;
};

type FooterButtonProp = {
  text: string;
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  onPress?: () => void;
};

function FooterButton({ text, icon }: FooterButtonProp) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <FontAwesome name={icon} size={16} color="gray" />
      <Text style={{ marginLeft: 5, color: "gray", fontWeight: 500 }}>
        {text}
      </Text>
    </View>
  );
}

export default function PostItem({ post }: PostItemProps) {
  const { dbUser } = useUserContext();

  const [handleMutation, { loading, error, data }] = useMutation(
    deletePostUser,
    { refetchQueries: ["PostPaginatedListQuery"] }
  );

  const [handleMutationAdmin, { loading: loadingAdmin, error: errorAdmin, data: dataAdmin }] = useMutation(
    deletePostByAdmin,
    { refetchQueries: ["PostPaginatedListQuery"] }
  );

  const {
    loading: commentsLoading,
    error: commentsError,
    data: commentsData,
    refetch,
  } = useQuery(commentUsingComment_postid_fkey, { variables: { id: post.id } });

  const router = useRouter();

  const onDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this post? This post and all comments on this post will be deleted!!!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              let result;
              if (dbUser.position === "Admin") {
                result = await handleMutationAdmin({
                  variables: {
                    id: post.id,
                  },
                });
              } else {
                result = await handleMutation({
                  variables: {
                    userid: dbUser.id,
                    id: post.id,
                  },
                });
              }

              if ((result.data && result.data.deletePostUser) || (result.data && result.data.deletePost)) {
                Alert.alert("Success", "Post deleted successfully!");
                router.push("/(tabs)/");
              } else {
                Alert.alert("Error", "Failed to delete post. Please try again later.");
              }
            } catch (e) {
              console.log(e);
              Alert.alert(
                "Error",
                "An error occurred while deleting the post."
              );
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const renderHeader = () => (
    <>
      {/* Header */}
      <Link href={`/users/${post.profile.id}`} asChild>
        <Pressable style={styles.header}>
          <Image
            source={{ uri: post.profile.image }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{post.profile.name}</Text>
            <Text>{post.profile.position}</Text>
          </View>
        </Pressable>
      </Link>
      {/* Text content */}
      <Text style={styles.content}>#P{post.id}</Text>
      <Text selectable={true} style={styles.content}>{post.content}</Text>

      {/* Image content */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Footer */}
      <View style={styles.footer}>
        {/* <FooterButton text="Like" icon="thumbs-o-up" /> */}
        <FooterButton text="Comment" icon="comment-o" />
        <Pressable>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FontAwesome name="trash" size={16} color="gray" />
            <Text
              onPress={onDelete}
              style={{ marginLeft: 5, color: "gray", fontWeight: 500 }}
            >
              Delete
            </Text>
          </View>
        </Pressable>
      </View>
      <CommentPost post={post} />
    </>
  );

  return (
    <FlatList
      data={commentsData?.commentUsingComment_postid_fkey || []}
      keyExtractor={(item, index) => item.id + "-" + index}
      renderItem={({ item }) => <CommentListItem comment={item} />}
      ListHeaderComponent={renderHeader}
      refreshing={commentsLoading}
      onRefresh={refetch}
      // keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text>No comments yet</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    // marginVertical: 10,
  },
  //Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  //Body
  content: {
    margin: 10,
    marginTop: 0,
    fontSize: 17
  },
  postImage: {
    width: "100%",
    aspectRatio: 1,
  },

  //Footer
  footer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderColor: "lightgray",
  },
  // Comments
  commentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    borderColor: "lightgray",
  },
  commentText: {
    fontSize: 16,
  },
});
