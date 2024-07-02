import React, { useRef, useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import WebView from "react-native-webview";
import { Button } from "react-native-paper";
import { spacing } from "../../utils/sizes";

export const Rubik = () => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef(null);

  // Intercept links to handle navigation within the WebView
  const handleNavigation = (event) => {
    // If the URL starts with the base URL, allow the WebView to handle it
    if (event.url.startsWith("https://rubik88.live/c/da-ga?aff=94#dangky")) {
      return true;
    }
    // Otherwise, open the link in the default browser
    Linking.openURL(event.url);
    return false;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        key={key}
        source={{ uri: "https://rubik88.live/c/da-ga?aff=94#dangky" }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        style={{ flex: 1 }}
        onShouldStartLoadWithRequest={handleNavigation}
      />
      <View style={styles.buttonWrapper}>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            if (webViewRef.current) {
              webViewRef.current.reload();
            }
          }}
        >
          Reload
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            setKey((prevKey) => prevKey + 1);
          }}
        >
          Home
        </Button>
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => {
            if (webViewRef.current) {
              webViewRef.current.goBack();
            }
          }}
        >
          Quay lại
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xl,
    flex: 1,
    backgroundColor: "#141414",
  },
  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});