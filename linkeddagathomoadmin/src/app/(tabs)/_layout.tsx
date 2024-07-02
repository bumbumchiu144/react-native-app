import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [activeLang, setActiveLang] = useState("english"); 
  const toggleLanguage = () => {
    setActiveLang(activeLang === "english" ? "vietnamese" : "english");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#191919",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: activeLang === "english" ? "Home Feed" : "Bảng Tin",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/search" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="search"
                    size={18}
                    color="gray"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
          headerLeft: () => (
            <Pressable onPress={toggleLanguage} style={{ marginLeft: 15 }}>
              <Text style={{ color: "royalblue", fontWeight: "bold" }}>
                {activeLang === "english" ? "Vietnamese" : "English"}
              </Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="new-post"
        options={{
          title: activeLang === "english" ? "Post" : "Bài Viết",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-square" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: activeLang === "english" ? "Profile" : "Hồ Sơ",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
