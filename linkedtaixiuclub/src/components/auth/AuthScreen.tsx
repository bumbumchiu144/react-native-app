import { View, Text, StyleSheet } from "react-native";
import SignInScreen from "./SignInScreen";
import { useState } from "react";
import SignUpScreen from "./SignUpScreen";

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState("sign-in");
  const [activeLang, setActiveLang] = useState("english");

  return (
    <View style={styles.container}>
      <Text style={styles.chooseLangText}>
        Choose your language/Chọn ngôn ngữ của bạn
      </Text>
      <View style={styles.langContainer}>
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
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Text
          onPress={() => setActiveTab("sign-in")}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeTab === "sign-in" ? "royalblue" : "gray",
          }}
        >
          {activeLang === "english" ? "Log in" : "Đăng Nhập"}
        </Text>
        <Text
          onPress={() => setActiveTab("sign-up")}
          style={{
            fontWeight: "500",
            fontSize: 20,
            color: activeTab === "sign-up" ? "royalblue" : "gray",
          }}
        >
          {activeLang === "english" ? "Register" : "Đăng Ký"}
        </Text>
      </View>
      {activeTab === "sign-in" && <SignInScreen activeLang={activeLang} />}
      {activeTab === "sign-up" && <SignUpScreen activeLang={activeLang} />}
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  chooseLangText: {
    marginLeft: 10,
    fontSize: 15,
  },
  langContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
