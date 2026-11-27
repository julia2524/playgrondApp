// import React, { useEffect, useRef } from "react";
// import { Animated, View } from "react-native";

// type PopEffectProps = {
//   x: number;
//   y: number;
//   color: string;
//   variant: "bubble" | "paint";
//   onComplete: () => void;
// };

// const PARTICLES = [
//   { x: 0, y: -1, size: 11 },
//   { x: 0.7, y: -0.7, size: 9 },
//   { x: 1, y: 0, size: 12 },
//   { x: 0.7, y: 0.7, size: 8 },
//   { x: 0, y: 1, size: 10 },
//   { x: -0.7, y: 0.7, size: 12 },
//   { x: -1, y: 0, size: 8 },
//   { x: -0.7, y: -0.7, size: 10 },
// ];

// export default function PopEffect({
//   x,
//   y,
//   color,
//   variant,
//   onComplete,
// }: PopEffectProps) {
//   const progress = useRef(new Animated.Value(0)).current;

//   const onCompleteRef = useRef(onComplete);
//   onCompleteRef.current = onComplete;

//   useEffect(() => {
//     const animation = Animated.timing(progress, {
//       toValue: 1,
//       duration: 360,
//       useNativeDriver: true,
//     });

//     animation.start(({ finished }) => {
//       if (finished) onCompleteRef.current();
//     });

//     return () => {
//       animation.stop();
//     };
//   }, [progress]);

//   const isBubble = variant === "bubble";

//   const ringScale = progress.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.3, 5.5],
//   });

//   const ringOpacity = progress.interpolate({
//     inputRange: [0, 0.15, 1],
//     outputRange: [0, 0.75, 0],
//   });

//   const secondRingScale = progress.interpolate({
//     inputRange: [0, 0.25, 1],
//     outputRange: [0.2, 0.8, 4.5],
//   });

//   const particleOpacity = progress.interpolate({
//     inputRange: [0, 0.12, 0.75, 1],
//     outputRange: [0, 1, 1, 0],
//   });

//   const particleScale = progress.interpolate({
//     inputRange: [0, 0.25, 1],
//     outputRange: [0.3, 1.15, 0.65],
//   });

//   return (
//     <View
//       pointerEvents="none"
//       style={{
//         position: "absolute",
//         left: x,
//         top: y,
//         zIndex: 100,
//         elevation: 100,
//       }}
//     >
//       {/* 비눗방울 원형 파동 */}
//       {isBubble && (
//         <>
//           <Animated.View
//             style={{
//               position: "absolute",
//               width: 30,
//               height: 30,
//               left: -15,
//               top: -15,
//               borderRadius: 15,
//               borderWidth: 2.5,
//               borderColor: color,
//               opacity: ringOpacity,
//               transform: [{ scale: ringScale }],
//             }}
//           />

//           <Animated.View
//             style={{
//               position: "absolute",
//               width: 20,
//               height: 20,
//               left: -10,
//               top: -10,
//               borderRadius: 10,
//               borderWidth: 2,
//               borderColor: "#FFFFFF",
//               opacity: ringOpacity,
//               transform: [{ scale: secondRingScale }],
//             }}
//           />
//         </>
//       )}

//       {/* 사방으로 튀는 물방울 / 물감 조각 */}
//       {PARTICLES.map((particle, index) => {
//         const distance = isBubble ? 65 : 78;

//         const translateX = progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, particle.x * distance],
//         });

//         const translateY = progress.interpolate({
//           inputRange: [0, 1],
//           outputRange: [0, particle.y * distance],
//         });

//         const particleColor = isBubble
//           ? index % 2 === 0
//             ? "#FFFFFF"
//             : color
//           : color;

//         return (
//           <Animated.View
//             key={index}
//             style={{
//               position: "absolute",
//               width: particle.size,
//               height: isBubble ? particle.size : particle.size * 1.25,
//               left: -particle.size / 2,
//               top: -particle.size / 2,
//               borderRadius: isBubble ? particle.size / 2 : 999,
//               backgroundColor: particleColor,
//               opacity: particleOpacity,
//               transform: [
//                 { translateX },
//                 { translateY },
//                 { scale: particleScale },
//                 {
//                   rotate: `${index * 45}deg`,
//                 },
//               ],
//             }}
//           />
//         );
//       })}
//     </View>
//   );
// }

import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

type PopEffectProps = {
  x: number;
  y: number;
  color: string;
  variant: "bubble" | "paint";
  onComplete: () => void;
};

const PARTICLES = [
  { x: 0, y: -1, size: 13, distance: 105, rotation: 90 },
  { x: 0.38, y: -0.92, size: 9, distance: 125, rotation: 180 },
  { x: 0.72, y: -0.72, size: 14, distance: 95, rotation: 270 },
  { x: 1, y: -0.15, size: 8, distance: 130, rotation: 120 },
  { x: 1, y: 0.3, size: 12, distance: 110, rotation: 220 },
  { x: 0.72, y: 0.72, size: 10, distance: 135, rotation: 90 },
  { x: 0.2, y: 1, size: 15, distance: 100, rotation: 180 },
  { x: -0.4, y: 0.92, size: 9, distance: 125, rotation: 270 },
  { x: -0.8, y: 0.6, size: 13, distance: 105, rotation: 180 },
  { x: -1, y: 0.1, size: 10, distance: 135, rotation: 90 },
  { x: -0.9, y: -0.45, size: 14, distance: 100, rotation: 270 },
  { x: -0.45, y: -0.88, size: 8, distance: 120, rotation: 180 },

  // 안쪽에서 튀어나오는 작은 물방울
  { x: 0.3, y: -0.5, size: 7, distance: 65, rotation: 180 },
  { x: 0.65, y: 0.25, size: 8, distance: 72, rotation: 90 },
  { x: -0.25, y: 0.55, size: 7, distance: 68, rotation: 270 },
  { x: -0.6, y: -0.2, size: 9, distance: 75, rotation: 180 },
  { x: 0.05, y: 0.3, size: 6, distance: 90, rotation: 90 },
  { x: -0.1, y: -0.35, size: 8, distance: 80, rotation: 270 },
];

const PARTICLE_COLORS = ["#FFFFFF", "#FFF1A8", "#B9E9D5", "#BDE8FA"];

export default function PopEffect({
  x,
  y,
  color,
  variant,
  onComplete,
}: PopEffectProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const onCompleteRef = useRef(onComplete);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 680,
      useNativeDriver: true,
    });

    animation.start(({ finished }) => {
      if (finished) {
        onCompleteRef.current();
      }
    });

    return () => animation.stop();
  }, [progress]);

  const isBubble = variant === "bubble";

  // 첫 번째 큰 파동
  const ringScale = progress.interpolate({
    inputRange: [0, 0.12, 1],
    outputRange: [0.2, 1, 5.5],
  });

  const ringOpacity = progress.interpolate({
    inputRange: [0, 0.12, 0.65, 1],
    outputRange: [0, 0.85, 0.25, 0],
  });

  // 두 번째 작은 파동
  const secondRingScale = progress.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [0.2, 1, 4],
  });

  const particleOpacity = progress.interpolate({
    inputRange: [0, 0.12, 0.65, 1],
    outputRange: [0, 1, 0.9, 0],
  });

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: x,
        top: y,
        zIndex: 100,
        elevation: 100,
      }}
    >
      {/* 큰 팡! 파동 */}
      <Animated.View
        style={{
          position: "absolute",
          width: 34,
          height: 34,
          left: -17,
          top: -17,
          borderRadius: 17,
          borderWidth: 3,
          borderColor: isBubble ? color : "#FFFFFF",
          opacity: ringOpacity,
          transform: [{ scale: ringScale }],
        }}
      />

      {/* 두 번째 파동 */}
      <Animated.View
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          left: -11,
          top: -11,
          borderRadius: 11,
          borderWidth: 2,
          borderColor: color,
          opacity: ringOpacity,
          transform: [{ scale: secondRingScale }],
        }}
      />

      {/* 사방으로 터지는 파티클 */}
      {PARTICLES.map((particle, index) => {
        const translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.x * particle.distance],
        });

        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, particle.y * particle.distance],
        });

        const scale = progress.interpolate({
          inputRange: [0, 0.2, 0.55, 1],
          outputRange: [0.2, 1.25, 1, 0.25],
        });

        const rotation = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", `${particle.rotation}deg`],
        });

        const particleColor = isBubble
          ? PARTICLE_COLORS[index % PARTICLE_COLORS.length]
          : index % 4 === 0
            ? "#FFFFFF"
            : color;

        return (
          <Animated.View
            key={index}
            style={{
              position: "absolute",
              width: particle.size,
              height: isBubble
                ? particle.size
                : particle.size * (index % 3 === 0 ? 0.7 : 1.35),
              left: -particle.size / 2,
              top: -particle.size / 2,
              borderRadius: index % 4 === 0 ? 2 : particle.size,
              backgroundColor: particleColor,
              opacity: particleOpacity,
              transform: [
                { translateX },
                { translateY },
                { rotate: rotation },
                { scale },
              ],
            }}
          />
        );
      })}

      {/* 중앙의 반짝이는 빛 */}
      <Animated.View
        style={{
          position: "absolute",
          width: 18,
          height: 18,
          left: -9,
          top: -9,
          borderRadius: 9,
          backgroundColor: "#FFFFFF",
          opacity: progress.interpolate({
            inputRange: [0, 0.12, 0.3, 0.55],
            outputRange: [0, 1, 0.8, 0],
          }),
          transform: [
            {
              scale: progress.interpolate({
                inputRange: [0, 0.15, 0.4],
                outputRange: [0.2, 1.8, 0.1],
              }),
            },
          ],
        }}
      />
    </View>
  );
}
