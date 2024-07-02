import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useUserContext } from "@/context/UserContext";

const createProfileMutation = gql`
  mutation CreateProfile(
    $about: String
    $name: String
    $authid: String
    $image: String
    $backimage: String
  ) {
    insertProfile(
      about: $about
      name: $name
      authid: $authid
      image: $image
      backimage: $backimage
    ) {
      id
      name
      authid
      about
      image
      backimage
    }
  }
`;

const images = [
  'https://i.pinimg.com/236x/b3/30/71/b330718e73c599417956316f2d1861f2.jpg',
  'https://i.pinimg.com/236x/09/0d/67/090d672cc06c96067f34f5f2163eea26.jpg',
  'https://i.pinimg.com/236x/c4/90/e1/c490e18987554dc84352903da8c26892.jpg',
  'https://i.pinimg.com/236x/72/89/34/728934c87556d63d494ec5176c4dcc8d.jpg',
  'https://i.pinimg.com/236x/1f/9b/9e/1f9b9e7db99449766bad590dc96f1a41.jpg',
  'https://i.pinimg.com/236x/ea/ad/a3/eaada3de69980458deadabc00ce566f7.jpg',
  'https://i.pinimg.com/236x/fc/d1/3e/fcd13e69051a89b313b8c73a52a81cec.jpg',
  'https://i.pinimg.com/236x/f0/3a/bb/f03abbdfbc29080e8537e5d97d66f13d.jpg',
  'https://i.pinimg.com/236x/43/4e/36/434e366bfcd04280c86555962b1b7bcb.jpg',
  'https://i.pinimg.com/236x/5a/df/41/5adf417336f6a4e85b49020bb046f5d6.jpg',
  'https://i.pinimg.com/236x/ed/5d/73/ed5d7315515ab3ff5e496a201e6c7549.jpg',
  'https://i.pinimg.com/236x/ab/3e/32/ab3e32a3606549c14b1f9cc70eb9b69c.jpg',
  'https://i.pinimg.com/236x/1d/29/65/1d29652b13da3f14833ed2c04107bca4.jpg',
  'https://i.pinimg.com/236x/56/a4/58/56a45858390e3726d2848d3efa696d6e.jpg',
  'https://i.pinimg.com/236x/61/11/6b/61116be543ccd9f2afd302b08c51df51.jpg',
  'https://i.pinimg.com/236x/44/02/c2/4402c277721e89347632189e55eb1c9b.jpg',
  'https://i.pinimg.com/236x/87/04/ca/8704ca574e52089db85ba8e52aad37f0.jpg',
  'https://i.pinimg.com/236x/61/11/1c/61111c8079805fca8ea1044dd8f70bd2.jpg'

];

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
}

const SetupProfileScreen = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState(getRandomImage());
  const [backimage, setBackImage] = useState(getRandomImage());
  const [activeLang, setActiveLang] = useState("english");

  const { authUser, reloadDbUser } = useUserContext();

  const [handleMutation, { loading }] = useMutation(createProfileMutation);

  const onSave = async () => {
    if (name == "") {
      Alert.alert("Note:", "The content can not empty!!!");
      return;
    }
    if (isSaving || name == "") {
      return;
    }
    setIsSaving(true);
    try {
      await handleMutation({
        variables: {
          name,
          about,
          authid: authUser.id,
          image,
          backimage,
        },
      });
      reloadDbUser();
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 10, fontSize: 15 }}>
        Choose your language/Chọn ngôn ngữ của bạn
      </Text>
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
          onPress={() => setActiveLang("english")}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeLang === "english" ? "royalblue" : "gray",
          }}
        >
          English
        </Text>
        <Text
          onPress={() => setActiveLang("vietnamese")}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeLang === "vietnamese" ? "royalblue" : "gray",
          }}
        >
          Vietnamse
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 25,
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          paddingVertical: 5,
          marginBottom: 15,
        }}
      >
        {activeLang === "english"
          ? "Setup Profile:"
          : "Thiết lập thông tin của bạn:"}
      </Text>

      <Text>
        {activeLang === "english" ? "Name:" : "Tên hiển thị của bạn:"}
      </Text>
      <TextInput
        placeholder={activeLang === "english" ? "Your Name" : "Tên của bạn"}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text>
        {activeLang === "english"
          ? "Descriptions:"
          : "Giới thiệu thông tin về bạn"}
      </Text>
      <TextInput
        placeholder={
          activeLang === "english"
            ? "Description About You"
            : "Mô tả về bản thân bạn"
        }
        multiline
        numberOfLines={3}
        value={about}
        onChangeText={setAbout}
        style={styles.input}
      />

      <TextInput
        placeholder="Avatar Image Url"
        multiline
        numberOfLines={3}
        value={image}
        onChangeText={setImage}
        style={[styles.input2, styles.hidden]}
      />

      <TextInput
        placeholder="Background Image Url"
        multiline
        numberOfLines={3}
        value={backimage}
        onChangeText={setBackImage}
        style={[styles.input2, styles.hidden]}
      />

      <TouchableOpacity onPress={onSave} style={styles.button}>
        <Text style={styles.buttonText}>{loading ? (activeLang === 'english' ? "Saving..." : 'Đang lưu') : (activeLang === 'english' ? "Save" : 'Lưu')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderRadius: 5,
    marginVertical: 5,
  },
  input2: {
    fontSize: 18,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderColor: "#ccc", // Add a border color for better visibility
    paddingBottom: 5, // Add some padding for better appearance
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hidden: {
    display: "none", // Hoặc sử dụng opacity: 0 để ẩn
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default SetupProfileScreen;
