import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// 1. 번역 문구 정의
const translations = {
  ko: {
    welcome: "안녕하세요!",
    button_text: "확인",
  },
  en: {
    welcome: "Hello!",
    button_text: "Confirm",
  },
} as const; // 💡 'as const'를 붙여주면 타입스크립트가 오타나 구문 오류를 엄격하게 잡아줍니다.

// 2. i18n 객체 생성
const i18n = new I18n(translations);

// 3. 기기 언어 감지
const deviceLanguage = getLocales()[0]?.languageCode;

// 4. 언어 설정 ('ko'나 'en'이 아니면 기본값 'en' 적용)
i18n.locale = deviceLanguage ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;
