import { Pressable, StyleSheet, TextInput, Image, Alert } from "react-native";
import { Text, View } from "@/components/Themed";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { useUserContext } from "@/context/UserContext";


const insertPost = gql`
  mutation MyMutation($userid: ID, $image: String, $content: String!) {
    insertPost(userid: $userid, image: $image, content: $content) {
      content
      id
      image
      userid
    }
  }
`;

const images = [
  "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
  "https://images.pexels.com/photos/34950/pexels-photo.jpg",
  "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg",
  "https://images.pexels.com/photos/257360/pexels-photo-257360.jpeg",
  "https://images.pexels.com/photos/462146/pexels-photo-462146.jpeg",
  "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  'https://images.unsplash.com/photo-1499346030926-9a72daac6c63',
  'https://i.pinimg.com/564x/71/91/21/719121822b7865b71b21ccd05a4dcd3c.jpg',
  'https://i.pinimg.com/564x/e0/66/7d/e0667d0b4a08b55700077e8f458a5072.jpg',
  'https://i.pinimg.com/564x/0b/e4/3d/0be43d46ed953ba0a6d8aa92f03f654a.jpg',
  'https://i.pinimg.com/236x/f9/bc/7a/f9bc7a2680a63fed4fca70640b2dfaf2.jpg',
  'https://i.pinimg.com/474x/20/ec/a6/20eca603cea522eda777b7440f3ce34e.jpg',
  'https://i.pinimg.com/236x/2e/ee/b3/2eeeb34d9785d191c788b9062aca271d.jpg'

];

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

export default function NewPostScreen() {
  const [activeLang, setActiveLang] = useState("english"); 
  const [activeImage, setActiveImage] = useState("yes");
  const [isPosting, setIsPostting] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(getRandomImage());
  const { dbUser } = useUserContext();

  const [handleMutation, { loading, error, data }] = useMutation(insertPost, {
    refetchQueries: ["PostPaginatedListQuery"],
  });

  const navigation = useNavigation();
  const router = useRouter();

  const toggleLanguage = () => {
    setActiveLang(activeLang === "english" ? "vietnamese" : "english");
  };


  const onPost = async () => {
    if (content == "") {
      Alert.alert("Note:", "The content can not empty!!!");
    }
    if (isPosting || content == "") {
      return;
    }
    setIsPostting(true);
    try {
      await handleMutation({
        variables: {
          userid: dbUser.id,
          content,
          image,
        },
      });
      router.push("/(tabs)/");
      setContent("");
      setImage(getRandomImage());
      // setImage(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsPostting(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      // title: "New Post",
      headerRight: () => (
        <Pressable onPress={onPost} style={styles.postButton}>
          <Text style={styles.postButtonText}>
            {loading ? "Submitting.." : "Submit"}
          </Text>
        </Pressable>
      ),
    });
  }, [onPost, loading]);

  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     // aspect: [4, 3],
  //     quality: 0.5,
  //   });

  //   console.log(result);

  //   if (!result.canceled) {
  //     setImage(result.assets[0].uri);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleLanguage} style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: "royalblue", fontWeight: "bold" }}>
                {activeLang === "english" ? "Vietnamese" : "English"}
              </Text>
            </Pressable>
      <Text style={styles.textContent}>{activeLang === 'english' ? 'Content:' : 'Nội dung'}</Text>
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder= {activeLang ==='english'? 'What do you want to talk about?' : 'Bạn muốn chia sẽ điều gì?'}
        style={styles.input1}
        multiline
      />

      <Text style={styles.textContent}>{activeLang === 'english' ? 'Do you want to add images to your posts?': 'Bạn có muốn thêm hình ảnh cho bài viết của mình?' }</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 20,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          padding: 10,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <Text
          onPress={() => {
            setActiveImage("yes");
            setImage(getRandomImage());
          }}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeImage === "yes" ? "royalblue" : "gray",
          }}
        >
          {activeLang === 'english'? 'Yes' : 'Có'}
        </Text>
        <Text
          onPress={() => {
            setActiveImage("no");
            setImage("");
          }}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeImage === "no" ? "royalblue" : "gray",
          }}
        >
          {activeLang === 'english'? 'No' : 'Không'}
          
        </Text>
      </View>
      <TextInput
        value={activeImage === "yes" ? image : ""}
        placeholder="Image Url"
        style={[styles.input2, styles.hidden]}
      />

      {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}

      {/* <View style={styles.footer}>
        <Pressable onPress={pickImage} style={styles.iconButton}>
          <FontAwesome name="image" size={24} color="black" />
        </Pressable>

        <View style={styles.iconButton}>
          <FontAwesome name="camera" size={24} color="black" />
        </View>

        <View style={styles.iconButton}>
          <FontAwesome name="glass" size={24} color="black" />
        </View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  textContent: {
    fontSize: 23,
  },
  input1: {
    fontSize: 18,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
    height: "40%",
  },
  input: {
    fontSize: 18,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input2: {
    fontSize: 18,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ccc", // Add a border color for better visibility
    paddingBottom: 5, // Add some padding for better appearance
  },
  hidden: {
    display: "none", // Hoặc sử dụng opacity: 0 để ẩn
  },

  //header
  postButton: {
    backgroundColor: "royalblue",
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    aspectRatio: 1,
    marginTop: "auto",
  },

  footer: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    backgroundColor: "lightgray",
    padding: 20,
    borderRadius: 100,
  },
});
