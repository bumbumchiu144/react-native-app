import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useAuth } from "@clerk/clerk-expo";
import { useUserContext } from "@/context/UserContext";
import { gql, useQuery } from "@apollo/client";
import { useFocusEffect } from "expo-router"; 
import { useCallback } from "react";

const myProfilequery = gql`
  query MyQuery($id: ID!) {
    profile(id: $id) {
      name
      image
      position
      about
      experience {
        id
        companyname
        companyimage
        title
        userid
      }
      backimage
    }
  }
`;

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { dbUser } = useUserContext();
  const { loading, error, data, refetch } = useQuery(myProfilequery, {
    variables: { id: dbUser.id },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.containerAc}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textac}>Loading...</Text>
      </View>
    )
  }

  if (error) {
    return <Text>Something went wrong...</Text>;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        {/* BG Image */}
        <Image source={{ uri: data.profile.backimage }} style={styles.backImage} />

        <View style={styles.headerContent}>
          {/* Profile Image */}
          <Image source={{ uri: data.profile.image }} style={styles.image} />

          {/* Name and Position */}
          <Text style={styles.name}>{data.profile.name}</Text>
          <Text>{data.profile.position}</Text>

          {/* Connect button */}
          <Pressable onPress={() => signOut()} style={styles.button}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
        </View>
      </View>

      {/* About */}
      {dbUser.about && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.paragraph}>{dbUser.about}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: "white",
    marginBottom: 5,
  },
  backImage: {
    width: "100%",
    aspectRatio: 5 / 2,
  },
  headerContent: {
    padding: 10,
    paddingTop: 0,
  },
  image: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
    marginTop: -60,
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
  },

  //Button
  button: {
    backgroundColor: "royalblue",
    padding: 10,
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },

  section: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 5,
  },
  paragraph: {
    lineHeight: 20,
    // letterSpacing: 0.2,
  },

  containerAc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textac: {
    marginTop: 10,
    fontSize: 16,
    color: '#0000ff',
    textAlign: 'center'
  },

});
