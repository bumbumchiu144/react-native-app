import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity } from "react-native";
import { Comment } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as Clipboard from 'expo-clipboard';


type CommentListItemProps = {
  comment: Comment;
};

export default function CommentListItem({ comment }: CommentListItemProps) {
  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
  };

  return (
    <View>
      <Pressable style={styles.container}>
        {/* Header */}
        <Link href={`/users/${comment.profile.id}`} asChild>
          <Pressable style={styles.header}>
            <Image
              source={{ uri: comment.profile?.image }}
              style={styles.userImage}
            />
            <View>
              <Text style={styles.userName}>{comment.profile?.name}</Text>
              <Text >{comment.profile?.position}</Text>
            </View>
          </Pressable>
        </Link>
        {/* Text content */}
        {/* <View style={{ flexDirection: "row" }}>
          <Text style={styles.content}>#C{comment.id}:</Text>
          <Text style={styles.content}>{comment.comment}</Text>
        </View> */}
        <View style={styles.commentContent}>
          <Text style={styles.commentId}>#C{comment.id}:</Text>
          <Text selectable={true} style={styles.content}>{comment.comment}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(comment.comment)} style={styles.copyButton}>
            <FontAwesome name="copy" size={20} color="gray" />
            <Text>Copy</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
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
  // content: {
  //   margin: 10,
  //   marginTop: 0,
  // },
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
  commentContent: {
    flexDirection: "row",
    marginLeft: 10,
    marginBottom: 10
    // flexWrap: "wrap",
  },
  commentId: {
    fontWeight: "bold",
  },
  content: {
    flexShrink: 1,
    marginLeft: 5,
    padding: 10,
    width: '100%',
    fontSize: 16
  },
  copyButton: {
    marginLeft: 10,
    marginRight: 30
  },
});
