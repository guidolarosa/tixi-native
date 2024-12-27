import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "react-query";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  Pressable,
  View,
  Modal,
  Alert,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Session } from "@supabase/supabase-js";
import { supabase } from "./../lib/supabase";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Create a new QueryClient instance
  const queryClient = new QueryClient();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const Header = () => {
    return (
      <ThemedView style={styles.header}>
        <View style={{ minWidth: "33.33%" }}>
          {session?.user && (
            <View
              style={{
                display: "flex",
                gap: 8,
                padding: 4,
                alignItems: "center",
                flexDirection: "row",
                borderRadius: 100,
              }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "dodgerblue",
                  borderRadius: 100,
                }}
              ></View>
              <ThemedText style={{ fontWeight: 600 }}>You</ThemedText>
            </View>
          )}
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: "33.33%",
          }}
        >
          <Ionicons name="ticket-outline" size={22} color={"orange"} />
          <ThemedText
            style={{ fontSize: 24, fontWeight: 600, letterSpacing: 4 }}
          >
            TIXI
          </ThemedText>
        </View>
        <Pressable
          style={{
            width: "33.33%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Entypo
            name="dots-three-vertical"
            size={18}
            color={"rgba(255,255,255,0.7)"}
          />
        </Pressable>
      </ThemedView>
    );
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={{ backgroundColor: "black" }}>
          <StatusBar />
        </SafeAreaView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ThemedText style={styles.modalText}>Hello World!</ThemedText>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <ThemedText style={styles.textStyle}>Hide Modal</ThemedText>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ header: Header }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    height: 40,
    backgroundColor: "rgba(0,0,0,0.1)",
    backdropFilter: "blur(10px)",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
