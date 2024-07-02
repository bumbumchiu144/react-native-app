import React, { useRef, useState } from "react";
import { View, StyleSheet, Linking, Button } from "react-native";
import { spacing } from "../../utils/sizes";
import { Card } from "react-native-paper";
import { colors } from "../../utils/colors";

export const Rubik = () => {
  const [key, setKey] = useState(0);
  const webViewRef = useRef();

  return (
    <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Cover
          style={styles.cover}
          source={require('../../../assets/imgs/truc-tiep-da-ga-c1-gioi-thieu.jpg')}
        />
      </Card>
      <View style={styles.fixToText}>
        <View style={styles.button1}>
        <Button
          title="Đăng ký"
          onPress={() => {
            Linking.openURL("https://rubik88.net?aff=197#dangky");
          }}
        />
        </View>
        <Button
          title="Chơi ngay"
          onPress={() => {
            Linking.openURL("https://rubik88.net?aff=197#dangky");
          }}
        />


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 12,
    backgroundColor: "#eef1ff"
    
  },
  card: { backgroundColor: "white"},
  cover: { padding: 20, backgroundColor: "white"},
  fixToText: {
    marginTop: 10
  },
  button1: {
    marginBottom: 10
  },
  button3: {
    marginTop: 10
  }
});


