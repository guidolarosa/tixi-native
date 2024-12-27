import * as React from "react";
import { Dimensions, View, ImageBackground } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { ThemedText } from "./ThemedText";
import { EventType } from "@/types";
import moment from "moment";

const width = Dimensions.get("screen").width;

function CustomCarousel({ data }: { data: EventType[] }) {
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <Carousel
      ref={ref}
      width={width}
      data={data}
      autoPlay
      autoPlayInterval={3000}
      height={200 + 60}
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 20, display: "flex", gap: 10 }}>
          <View style={{}}>
            <ImageBackground
              style={{
                height: 200,
              }}
              imageStyle={{ borderRadius: 10 }}
              source={{ uri: item.mainImage }}
              resizeMode="cover"
            ></ImageBackground>
          </View>
          <View style={{ display: "flex", gap: 4 }}>
            <ThemedText style={{ fontSize: 20, fontWeight: 600 }}>
              {item.title}
            </ThemedText>
            <ThemedText style={{ fontSize: 14, opacity: 0.5 }}>
              {moment(new Date(item.date).toUTCString()).format("dddd DD MMMM")}
            </ThemedText>
          </View>
        </View>
      )}
    />
  );
}

export default CustomCarousel;
