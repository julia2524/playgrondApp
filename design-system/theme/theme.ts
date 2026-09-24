import i18n from "../../i18n";

//TYPOGRAPHY = 글자는 어떻게 생겼나?
export const theme = {
  // 💡 getter를 사용해 fontFamily를 조회할 때마다 현재 언어에 맞는 폰트 반환
  get fontFamily() {
    const lang = i18n.locale;
    if (lang?.startsWith("zh")) return "ZCOOLKuaiLe";
    if (lang?.startsWith("ko")) return "Jua";
    return "Fredoka"; // 기본값 (영어)
  },
  typography: {
    giant: 32,
    title: 28,
    heading: 24,
    subheading: 20,
    body: 16,
    small: 14,
    tiny: 12,
    level: 26,
    button: 18,
  },
};
