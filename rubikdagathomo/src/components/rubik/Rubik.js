import React, { useRef, useState } from "react";
import { View, StyleSheet, Linking } from "react-native";
import { spacing } from "../../utils/sizes";
import WebView from "react-native-webview";
import { Button } from "react-native-paper";

export const Rubik = () => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef(null);
  return (
      <View style={styles.container}>
        <WebView
            ref={webViewRef}
            key={key}
            javaScriptEnabled={true}
            setSupportMultipleWindows={false}
            source={{
              uri: "https://bumbumchiu144.wixsite.com/rubikdagathomo"
            }}
            originWhitelist={['https://*']}
            sharedCookiesEnabled={true}
            style={{ flex: 1 }}
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
