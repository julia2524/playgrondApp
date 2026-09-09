import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  Apple,
  Airplane,
  Banana,
  Bus,
  Cake,
  Cookie,
  Tomato,
  Watermelon,
  Car,
  Carrot,
  Cat,
  Chicken,
  Cucumber,
  Dog,
  Dolphin,
  Duck,
  Gimbap,
  Hamburger,
  IceCream,
  Octopus,
  Penguin,
  Pizza,
  Rabbit,
  Rice,
  Shark,
  Ship,
  Strawberry,
  Train,
  Whale,
} from "./category/assets/categoryItemSvgs";
import {
  createCategoryRound,
  GeneratedItem,
} from "./category/categoryGenerators";

export const svgMap: Record<string, React.FC<any>> = {
  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
  chicken: Chicken,
  duck: Duck,
  penguin: Penguin,
  whale: Whale,
  shark: Shark,
  octopus: Octopus,
  dolphin: Dolphin,
  apple: Apple,
  banana: Banana,
  strawberry: Strawberry,
  watermelon: Watermelon,
  carrot: Carrot,
  cucumber: Cucumber,
  tomato: Tomato,
  rice: Rice,
  gimbap: Gimbap,
  pizza: Pizza,
  hamburger: Hamburger,
  cake: Cake,
  cookie: Cookie,
  iceCream: IceCream,
  car: Car,
  bus: Bus,
  train: Train,
  airplane: Airplane,
  ship: Ship,
};
const ItemSvg = ({
  item,
  size = 90,
}: {
  item: GeneratedItem;
  size?: number;
}) => {
  const SvgComponent = svgMap[item.svgKey];
  if (!SvgComponent) {
    return <Text>SVG 없음: {item.svgKey}</Text>;
  }

  return (
    <SvgComponent
      colorHex={item.variant.primary}
      primary={item.variant.primary}
      secondary={item.variant.secondary}
      accent={item.variant.accent}
      pattern={item.variant.pattern}
      size={size}
    />
  );
};

export default function CategoryTestScreen() {
  const [level, setLevel] = React.useState(1);
  const [problem, setProblem] = React.useState(() => createCategoryRound(1));

  const regenerate = (lv: number) => {
    setLevel(lv);
    setProblem(createCategoryRound(lv));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level {problem.level}</Text>
      <Text style={styles.sub}>
        {problem.config.targetColorMode} / {problem.config.correctObjectMode}
        {problem.config.wrongRelation
          ? ` / ${problem.config.wrongRelation}`
          : ""}
      </Text>

      {/* TargetBox */}
      <Text style={styles.section}>TargetBox</Text>
      <View style={styles.row}>
        {problem.targetBox.map((item, idx) => (
          <View key={idx} style={styles.item}>
            <ItemSvg item={item} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        ))}
      </View>

      {/* ObjectBox */}
      <Text style={styles.section}>
        ObjectBox (정답 인덱스: {problem.correctIndex})
      </Text>
      <View style={styles.row}>
        {problem.objectBox.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.item}>
            <ItemSvg item={item} />
            <Text style={styles.name}>
              {item.name} {item.isCorrect ? "✅" : ""}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 레벨 버튼 */}
      <View style={styles.buttons}>
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map((lv) => (
          <TouchableOpacity
            key={lv}
            onPress={() => regenerate(lv)}
            style={styles.btn}
          >
            <Text>Lv.{lv}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF8E1" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 4 },
  sub: { fontSize: 13, color: "#666", marginBottom: 16 },
  section: { fontSize: 16, fontWeight: "600", marginTop: 16, marginBottom: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  item: { alignItems: "center", width: 100 },
  name: { marginTop: 4, fontSize: 13 },
  buttons: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 24 },
  btn: {
    backgroundColor: "#FFE082",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
