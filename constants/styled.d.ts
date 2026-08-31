import "styled-components/native";

// 방금 만든 theme 객체의 구조 타입 정의
declare module "styled-components/native" {
  export interface DefaultTheme {
    fontFamily: string;
    typography: {
      giant: number;
      title: number;
      heading: number;
      subheading: number;
      body: number;
      small: number;
      tiny: number;
      level: number;
      button: number;
    };
  }
}
