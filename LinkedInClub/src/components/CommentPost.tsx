import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Post } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useUserContext } from "@/context/UserContext";
import { gql, useMutation } from "@apollo/client";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";

const insertComment = gql`
  mutation MyMutation($postid: ID!, $userid: ID!, $comment: String!) {
    insertComment(postid: $postid, userid: $userid, comment: $comment) {
      id
      postid
      userid
      comment
    }
  }
`;

type PostItemProps = {
  post: Post;
};

export default function CommentPost({ post }: PostItemProps) {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const { dbUser } = useUserContext();

  const [handleMutation, { loading, error, data }] = useMutation(
    insertComment,
    { refetchQueries: ["commentUsingComment_postid_fkey"] }
  );

  const router = useRouter();

  const onComment = async () => {
    if (isCommenting || comment == "") {
      return;
    }
    setIsCommenting(true);
    try {
      const result = await handleMutation({
        variables: {
          postid: post.id,
          comment,
          userid: dbUser.id,
        },
      });

      if (result && result.data.insertComment) {
        Alert.alert("Success", "Comment added successfully!");
        setComment("");
      } else {
        Alert.alert("Error", "Failed to add comment. Please try again later.");
      }
      //   router.push("/(tabs)/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsCommenting(false);
    }
  };

  return (
    <View style={styles.commentInputContainer}>
      <TextInput
        placeholder="Add a comment..."
        value={comment}
        onChangeText={setComment}
        style={styles.commentInput}
      />
      <Pressable onPress={onComment} style={styles.commentButton}>
        <Text style={styles.commentButtonText}>
          {loading ? "Commenting.." : "Comment"}
        </Text>
      </Pressable>
    </View>
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

  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderColor: "lightgray",
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  commentButton: {
    backgroundColor: "royalblue",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  commentButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
