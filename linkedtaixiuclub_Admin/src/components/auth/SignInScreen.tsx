import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

type activeLangProps = {
  activeLang: string
}

export default function SignInScreen({activeLang} : activeLangProps) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder={activeLang === 'english' ? 'Email...' : 'Địa chỉ email'}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress.trim())}
          style={styles.input}
        />
      </View>

      <View style={{width: '100%'}}>
        <TextInput
          value={password}
          placeholder={activeLang === 'english' ? 'Password' : 'Mật khẩu'}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password.toLowerCase().trim())}
          style={styles.input}
        />
      </View>

      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={styles.buttonText}>{activeLang === 'english' ? 'Log In' : 'Đăng nhập'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
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
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    width: '100%'
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  notionText: {
    fontWeight: "bold",
    color: "royalblue",
  },
});
