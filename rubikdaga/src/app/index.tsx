import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import ChickenListItem from "@components/core/ChickenListItem";
import axios from "axios";
import {useEffect, useState} from "react";
import {Rubik} from "@components/rubik/Rubik";

const images = [
  'https://bsfsmartfarm.com/wp-content/uploads/2022/04/news_680.jpg',
  'https://bizweb.dktcdn.net/100/080/957/files/nguon-goc-va-phan-loai-ga-choi-viet-nam.jpg?v=1556164620091',
  'https://nongnghiepmoi.net/wp-content/uploads/2018/06/DSC01836-768x576.jpg',
  'https://bsfsmartfarm.com/wp-content/uploads/2022/04/17c52bcbaac0519e08d1.jpg',
  'https://klt.vn/wp-content/uploads/2021/01/cach-lam-chuong-nuoi-ga-tre-don-gian-ma-hieu-qua-ga-tre.jpg',
  'https://klt.vn/wp-content/uploads/2020/12/goc-kham-pha-nguoi-dan-nao-da-dua-con-ga-viet-vuon-ra-the-gioi-r_xvji.jpg',
  'https://nld.mediacdn.vn/thumb_w/698/291774122806476800/2022/1/24/mot-con-ga-choi-binh-dinh--164301911318885211979.jpg',
  'https://ddk.1cdn.vn/2020/07/08/static.daidoanket.vn-images-upload-vanpt-07082020-_anh-trang-25.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/G%C3%A0_ch%E1%BB%8Di.JPG/800px-G%C3%A0_ch%E1%BB%8Di.JPG?20100806151638',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd9OSGZWTxnaqql4FnNYrKBOVqLi-eIOWPakjB3qJcTBXlOX_RdpC3VuG1vX8LYCUyeDE&usqp=CAU',
];

const chickens = [...Array(10)].map((val, index) => ({
  id: index + 1,
  image_url: images[index]
}));

export default function HomeScreen() {
  const [isInVietnam, setIsInVietnam] = useState(false);
  useEffect(() => {
    axios
        .get("https://ipinfo.io/json?token=907367b9c96efc")
        .then((response) => {
          const { country } = response.data;
          console.log(country);
          if (country === "VN") {
            setIsInVietnam(true);
          }
        })
        .catch((error) => {
          console.warn(error);
        });
  });

  return (
      <>
        {isInVietnam ? (
            <Rubik />
        ) : (
            <View style={styles.container}>
              <FlatList
                  contentContainerStyle={styles.content}
                  columnWrapperStyle={styles.column}
                  numColumns={2}
                  data={chickens}
                  renderItem={({ item }) => <ChickenListItem chicken={item} /> }
              />
              <StatusBar style="auto" />
            </View>
        )}
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    gap: 10,
    padding: 10,
  },

  column: {
    gap: 10,
  },

  box: {
    backgroundColor: "#F9EDE3",
    flex: 1,
    aspectRatio: 1,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#9b4521",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#9b4521",
    fontSize: 50,
  },
});
