import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from "react-native";
import ChickenListItem from "../components/core/ChickenListItem";
import { useEffect, useState } from "react";
import { Rubik } from "../components/rubik/Rubik";
import { fetchIp, getAppConfig } from "../services/ApiManager";
import {images, chickenNames} from "../constants/dataHelper";


const chickens = [...Array(10)].map((val, index) => ({
  id: index + 1,
  image_url: images[index],
  chicken_names: chickenNames[index],
}));

export default function HomeScreen() {
  const [isVN, setIsVN] = useState(false);
  const [isAppPublic, setIsAppPublic] = useState("no");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const isVietnamese = await fetchIp();
      setIsVN(isVietnamese);

      const appPublic = await getAppConfig();
      setIsAppPublic(appPublic);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" animating={true} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      {isVN && isAppPublic === "yes" ? (
        <Rubik />
      ) : (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.content}
            columnWrapperStyle={styles.column}
            numColumns={2}
            data={chickens}
            renderItem={({ item }) => <ChickenListItem chicken={item} />}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#6200ee",
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
