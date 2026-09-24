import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
interface CustomSplashProps {
  imageSource: ImageSourcePropType;
}

export default function CustomSplash({ imageSource }: CustomSplashProps) {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain" /* 👈 cover에서 contain으로 변경 */
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center", // 중앙 정렬
    justifyContent: "center", // 중앙 정렬
  },

  image: {
    width: "70%", // 화면 너비의 70% 크기로 유지 (정사각형 폰에서도 절대 안 잘림)
    height: "70%", // 비율에 맞춰 축소/확대
  },
});
