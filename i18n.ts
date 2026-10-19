import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RNRestart from "react-native-restart"; // 👈 추가

// 1. 지원하는 38개 언어 태그 타입 정의
export type SupportedLanguage =
  | "ar"
  | "bn"
  | "zh-Hans"
  | "zh-Hant"
  | "nl"
  | "arz"
  | "en"
  | "fr"
  | "de"
  | "el"
  | "ha"
  | "hi"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "ms"
  | "mr"
  | "ne"
  | "pcm"
  | "fa-IR"
  | "pl"
  | "pt"
  | "ro"
  | "ru"
  | "es"
  | "sw"
  | "sv"
  | "tl"
  | "ta"
  | "te"
  | "th"
  | "tr"
  | "ur"
  | "vi"
  | "pnb"
  | "wuu"
  | "yue";

// 2. 38개 언어 JSON 파일 임포트
import ar from "./locales/ar.json";
import bn from "./locales/bn.json";
import zhHans from "./locales/zh-Hans.json";
import zhHant from "./locales/zh-Hant.json";
import nl from "./locales/nl.json";
import arz from "./locales/arz.json";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import el from "./locales/el.json";
import ha from "./locales/ha.json";
import hi from "./locales/hi.json";
import id from "./locales/id.json";
import it from "./locales/it.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import ms from "./locales/ms.json";
import mr from "./locales/mr.json";
import ne from "./locales/ne.json";
import pcm from "./locales/pcm.json";
import faIR from "./locales/fa-IR.json";
import pl from "./locales/pl.json";
import pt from "./locales/pt.json";
import ro from "./locales/ro.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";
import sw from "./locales/sw.json";
import sv from "./locales/sv.json";
import tl from "./locales/tl.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import th from "./locales/th.json";
import tr from "./locales/tr.json";
import ur from "./locales/ur.json";
import vi from "./locales/vi.json";
import pnb from "./locales/pnb.json";
import wuu from "./locales/wuu.json";
import yue from "./locales/yue.json";

// 3. i18n 번역 객체 전체 매핑
const translations: Record<SupportedLanguage, any> = {
  ar,
  bn,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant,
  nl,
  arz,
  en,
  fr,
  de,
  el,
  ha,
  hi,
  id,
  it,
  ja,
  ko,
  ms,
  mr,
  ne,
  pcm,
  "fa-IR": faIR,
  pl,
  pt,
  ro,
  ru,
  es,
  sw,
  sv,
  tl,
  ta,
  te,
  th,
  tr,
  ur,
  vi,
  pnb,
  wuu,
  yue,
};

// 2. RTL(오른쪽에서 왼쪽으로 읽는) 언어 세트 목록
const RTL_LANGUAGES: Set<string> = new Set([
  "ar", // Arabic
  "arz", // Egyptian Arabic
  "fa-IR", // Persian (Iran)
  "ur", // Urdu
  "pnb", // Western Punjabi
]);

// 4. i18n 객체 생성 및 기본값 설정
const i18n = new I18n(translations);
i18n.enableFallback = true;
i18n.defaultLocale = "en";

// 5. 기기 언어 감지 및 표준화
const deviceLocale =
  getLocales()[0]?.languageTag || getLocales()[0]?.languageCode || "en";
i18n.locale = deviceLocale;

// export const applyRTLIfNeeded = async (lang: string) => {
//   const isRTL = RTL_LANGUAGES.has(lang);

//   if (I18nManager.isRTL !== isRTL) {
//     I18nManager.allowRTL(isRTL);
//     I18nManager.forceRTL(isRTL);

//     try {
//       await Updates.reloadAsync(); // 언어 변경 시 자동 새로고침
//     } catch (e) {
//       console.log("App reload failed or running on dev client");
//     }
//   }
// };

// // ==========================================
// // 💡 [추가 2] 사용자가 수동으로 언어를 변경할 때 호출
// // ==========================================
// export const changeLanguage = async (lang: SupportedLanguage) => {
//   try {
//     i18n.locale = lang;
//     await AsyncStorage.setItem("user_language", lang); // 선택한 언어 저장
//     await applyRTLIfNeeded(lang); // 👈 여기서 호출
//     // applyRTLIfNeeded(lang); // 선택한 언어의 RTL 여부 적용
//   } catch (e) {
//     console.error("Failed to save language", e);
//   }
// };

// // 💡 3. 앱 시작 시 저장된 언어 불러올 때도 RTL 확인
// export const loadSavedLanguage = async () => {
//   try {
//     const savedLanguage = await AsyncStorage.getItem("user_language");
//     if (savedLanguage) {
//       i18n.locale = savedLanguage;
//       await applyRTLIfNeeded(savedLanguage); // 👈 여기서 호출
//     }
//   } catch (e) {
//     console.error("Failed to load saved language", e);
//   }
// };

export const applyRTLIfNeeded = (lang: string) => {
  const isRTL = RTL_LANGUAGES.has(lang);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    // 💡 네이티브 브릿지 상태가 변경된 직후 즉시 앱을 재부팅합니다!
    setTimeout(() => {
      RNRestart.restart();
    }, 100);
  }
};

export const changeLanguage = async (lang: SupportedLanguage) => {
  try {
    i18n.locale = lang;
    await AsyncStorage.setItem("user_language", lang);
    applyRTLIfNeeded(lang); // 👈 비동기 대기 없이 호출
  } catch (e) {
    console.error("Failed to save language", e);
  }
};

export const loadSavedLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user_language");
    if (savedLanguage) {
      i18n.locale = savedLanguage;
      applyRTLIfNeeded(savedLanguage);
    }
  } catch (e) {
    console.error("Failed to load saved language", e);
  }
};
export default i18n;
