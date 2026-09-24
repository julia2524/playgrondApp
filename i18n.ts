import { getLocales } from "expo-localization";
import { I18n } from "i18n-js";

// 💡 JSON 파일들 불러오기
import ko from "./locales/ko.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
// 1. 번역 문구 정의 (한국어, 영어, 중국어)
// 1. 번역 문구 등록
const translations = { ko, en, zh };

// 2. i18n 객체 생성
const i18n = new I18n(translations);

// 3. 기기 언어 감지
const deviceLanguage = getLocales()[0]?.languageCode;

// 4. 언어 설정
i18n.locale = deviceLanguage ?? "en";
i18n.enableFallback = true;
i18n.defaultLocale = "en";

export default i18n;
