import React from "react";
import { View } from "react-native";
import {
  BannerAd as GoogleBannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

export default function BannerAd() {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : "ca-app-pub-4226620856687729/2756283514";

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <GoogleBannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}
