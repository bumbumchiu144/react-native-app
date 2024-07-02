import * as React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

type activeLangProps = {
  activeLang: string;
};

export default function SignUpScreen({ activeLang }: activeLangProps) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const isValidPhoneNumber = (phoneNumber: string) => {
    return !isNaN(Number(phoneNumber));
    // if (activeLang === "english") {
    //   // Only check if it's a number
    //   return !isNaN(Number(phoneNumber));
    // } else {
    //   // Vietnamese validation logic
    //   const phoneRegex =
    //     /^(032|033|034|035|036|037|038|039|083|084|085|081|082|070|079|077|076|078|056|058)\d{7}$/;
    //   return phoneRegex.test(phoneNumber);
    // }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    if (!isValidPhoneNumber(firstName)) {
      Alert.alert(
        activeLang === "english"
          ? "Invalid Phone Number"
          : "Số Điện Thoại Không Hợp Lệ",
        activeLang === "english"
          ? "Invalid phone number format."
          : "Định dạng số điện thoại không hợp lệ."
      );
      return;
    }

    if (!isValidEmail(emailAddress)) {
      Alert.alert(
        activeLang === "english" ? "Invalid Email" : "Email Không Hợp Lệ",
        activeLang === "english"
          ? "Invalid email format."
          : "Định dạng email không hợp lệ."
      );
      return;
    }

    if (!isValidPassword(password)) {
      Alert.alert(
        activeLang === "english"
          ? "Invalid Password"
          : "Mật Khẩu Không Hợp Lệ",
        activeLang === "english"
          ? "Password must be 8 characters long and must include: letters, numbers, and special characters. Password cannot contain whitespace. Passwords are not case sensitive."
          : "Mật khẩu phải từ 8 kí tự phải bao gồm: chữ, số, kí tự đặc biệt. Mật khẩu không được chứa khoảng trắng. Mật khẩu không phân biệt chữ hoa hay chữ thường"
      );
      return;
    }
  

    try {
      await signUp.create({
        firstName,
        // lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification && (
        <View style={{ width: "100%" }}>
          <Text style={styles.notionText}>
            {activeLang === "english"
              ? "Please enter the information accurately. OTP code will be sent to email or your phone number. Please check your email and messages to get OTP"
              : "Hãy nhập chính xác các thông tin. Mã OTP sẽ được gửi vào email hoặc số điện thoại của bạn. Hãy kiểm tra email và tin nhắn để lấy OTP"}
          </Text>
          <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder={
                activeLang === "english" ? "Phone number..." : "Số điện thoại"
              }
              onChangeText={(firstName) => {
                setFirstName(firstName.trim());
                setErrorMessage("");
              }}
              style={styles.input}
            />
          </View>
          {/* <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(lastName) => setLastName(lastName)}
              style={styles.input}
            />
          </View> */}
          <Text style={styles.notionText}>
            {activeLang === "english"
              ? "Please enter the information accurately. OTP code will be sent to email or your phone number. Please check your email and messages to get OTP"
              : "Hãy nhập chính xác các thông tin. Mã OTP sẽ được gửi vào email hoặc số điện thoại của bạn. Hãy kiểm tra email và tin nhắn để lấy OTP"}
          </Text>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder={
                activeLang === "english" ? "Email..." : "Địa chỉ email"
              }
              onChangeText={(email) => setEmailAddress(email.trim())}
              style={styles.input}
            />
          </View>

          <View>
          <Text style={styles.notionText}>
              {activeLang === "english"
                ? "Password must be 8 characters long and must include: letters, numbers, and special characters. Password cannot contain whitespace. Passwords are not case sensitive"
                : "Mật khẩu phải từ 8 kí tự phải bao gồm: chữ, số, kí tự đặc biệt. Mật khẩu không được chứa khoảng trắng. Mật khẩu không phân biệt chữ hoa hay chữ thường"}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                autoCapitalize="none"
                value={password}
                placeholder={activeLang === "english" ? "Password" : "Mật khẩu"}
                secureTextEntry={!showPassword}
                onChangeText={(password) => setPassword(password.toLowerCase().trim())}
                style={[styles.input, { width: "90%" }]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
            <Text style={styles.buttonText}>
              {activeLang === "english" ? "Register" : "Đăng kí"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View style={{ width: "100%" }}>
          <View>
            <Text style={styles.notionText}>
              {activeLang === "english"
                ? "Check your Email to get OTP"
                : "Kiểm tra Email của bạn để lấy OTP"}
            </Text>
            <TextInput
              value={code}
              placeholder={activeLang === "english" ? "Code..." : "Mã OTP..."}
              onChangeText={(code) => setCode(code)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify} style={styles.button}>
            <Text style={styles.buttonText}>
              {activeLang === "english" ? "Verify Email" : "Xác thực OTP"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  eyeIcon: {
    justifyContent: "center",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
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
