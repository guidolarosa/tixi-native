import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  ImageBackground,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomCarousel from "@/components/Carousel";
import useEvents from "@/utils/queries/useEvents";
import useHome from "@/utils/queries/useHome";
import PosterCarousel from "@/components/PosterCarousel";
import { WebView } from "react-native-webview";

import { toHTML } from "@portabletext/to-html";

const portableTextToHtml = (portableText) => {
  return toHTML(portableText, {
    components: {
      // Optionally define serializers for custom Portable Text types.
      types: {
        // Example: Serialize image objects
        image: ({ value }) =>
          `<img src="${value.asset.url}" alt="${value.alt || ""}" />`,
      },
    },
  });
};

export default function HomeScreen() {
  const { data: events, isLoading, error } = useEvents();
  const { data: home } = useHome();

  const htmlContent = home?.artist_of_the_month?.bio
    ? `<html><body style="color: white; font-family: 'Arial'; font-size: 48px">${toHTML(home.artist_of_the_month.bio)}</body></html>`
    : `<html><body><p>No content available.</p></body></html>`;

  console.log("HTML: ", htmlContent);

  return (
    <ScrollView style={{ marginVertical: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.textInputWrapper}>
          <FontAwesome5 name="search" size={16} color="rgba(255,255,255,0.5)" />
          <TextInput
            style={styles.textInput}
            placeholder="Search for shows in your area..."
          />
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              console.log("Filter");
            }}
          >
            <View
              style={{
                height: 16,
                width: 1,
                backgroundColor: "rgba(255,255,255,0.3)",
                marginRight: 10,
              }}
            />
            <MaterialCommunityIcons
              name="tune-variant"
              size={20}
              color="rgba(255,255,255,0.5)"
            />
          </Pressable>
        </View>
      </View>

      <View style={{ marginTop: 24 }}>
        <ThemedText style={styles.sectionHeading}>Featured</ThemedText>
        <View style={{ height: 200 + 60 }}>
          <CustomCarousel data={home?.featuredEvents} />
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <ThemedText style={styles.sectionHeading}>Featured</ThemedText>
        <View style={{ height: 280 + 60 }}>
          <PosterCarousel data={events} />
        </View>
      </View>
      <View style={{ marginTop: 24 }}>
        <ThemedText style={styles.sectionHeading}>
          Artist of the Month
        </ThemedText>
        <View style={{ paddingHorizontal: 20 }}>
          <ImageBackground
            style={{
              height: Dimensions.get("screen").width - 50,
            }}
            imageStyle={{ borderRadius: 10 }}
            source={{ uri: home?.artist_of_the_month.image }}
            resizeMode="cover"
          ></ImageBackground>
          <View style={styles.container}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: htmlContent }}
              style={styles.webView}
            />
          </View>
        </View>
      </View>
      <SafeAreaView style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  webView: { flex: 1, height: 240, backgroundColor: 'transparent', marginTop: 10, opacity: 0.8},
  textInputWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: Colors.dark.background,
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textInput: {
    color: "white",
    paddingHorizontal: 10,
    flexGrow: 1,
  },
  sectionHeading: {
    textTransform: "uppercase",
    fontWeight: 500,
    letterSpacing: 2,
    marginBottom: 14,
    paddingHorizontal: 20,
  },
});
