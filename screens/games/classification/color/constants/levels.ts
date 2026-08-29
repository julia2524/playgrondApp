// //Level 1~5의 문제 규칙 설정: "이 레벨의 규칙이 무엇인가"

// Level 1~5의 색깔 분류 문제 규칙 설정
import { ClassificationLevel } from "../types";

export const classificationLevels: ClassificationLevel[] = [
  // Level 1: 기초 단계 (선택지 2개: 정답 1 + 전혀 다른 오답 1)
  {
    level: 1,

    type: "drag_sort",

    objectCount: 1,

    targetCount: 1,

    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "color_classification",
  },
  {
    level: 2,
    type: "drag_sort",
    objectCount: 2, // 총 오브젝트 2개 (정답 1 + 오답 1)
    targetCount: 1,
    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "color_classification",
  },

  // Level 2: 선택지 확장 (선택지 3개: 정답 1 + 완전히 다른 오답 2)
  {
    level: 3,
    type: "drag_sort",
    objectCount: 3, // 총 오브젝트 3개 (정답 1 + 오답 2)
    targetCount: 1,
    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "color_classification",
  },

  // Level 3: 색상 풀 확장 (새로운 색상 대거 등장, 선택지 3개)
  {
    level: 4,
    type: "drag_sort",
    objectCount: 3, // 총 오브젝트 3개
    targetCount: 1,
    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "color_classification",
  },

  // Level 4: 선택지 최대치 (선택지 4개, 2x2 그리드 풀 채우기)
  {
    level: 5,
    type: "drag_sort",
    objectCount: 2, // 총 오브젝트 4개 (정답 1 + 오답 3)
    targetCount: 1,
    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "color_classification",
  },

  // Level 5: 유사 색상 변별력 (최고난도 마스터 스테이지, 헷갈리는 유사 색상 오답)
  {
    level: 6,
    type: "drag_sort",
    objectCount: 3, // 총 오브젝트 4개 (유사 색상 포함)
    targetCount: 1,
    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "color_classification",
  },
];

// import { ClassificationLevel } from "./types";

// export const classificationLevels: ClassificationLevel[] = [
//   {
//     level: 1,
//     type: "drag_sort",

//     objectCount: 2,
//     targetCount: 1,

//     features: {
//       color: true,
//       shape: false,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_color",
//   },

//   {
//     level: 2,
//     type: "drag_sort",

//     objectCount: 3,
//     targetCount: 1,

//     features: {
//       color: false,
//       shape: true,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_shape",
//   },

//   {
//     level: 3,
//     type: "drag_sort",

//     objectCount: 4,
//     targetCount: 1,

//     features: {
//       color: false,
//       shape: false,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: true,
//     },

//     rule: "same_category",
//   },

//   {
//     level: 4,
//     type: "drag_sort",

//     objectCount: 4,
//     targetCount: 1,

//     features: {
//       color: false,
//       shape: false,
//       size: true,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_size",
//   },

//   {
//     level: 5,
//     type: "drag_sort",

//     objectCount: 4,
//     targetCount: 1,

//     features: {
//       color: true,
//       shape: true,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_color_and_shape",
//   },
//   {
//     level: 6,
//     type: "drag_sort",

//     objectCount: 2,
//     targetCount: 2,

//     features: {
//       color: true,
//       shape: false,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },
//     rule: "same_color",
//   },
//   {
//     level: 7,
//     type: "drag_sort",

//     objectCount: 3,
//     targetCount: 3,

//     features: {
//       color: true,
//       shape: true,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_color_and_shape",
//   },
//   {
//     level: 8,
//     type: "drag_sort",

//     objectCount: 3,
//     targetCount: 2,

//     features: {
//       color: false,
//       shape: false,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: true,
//     },

//     rule: "fruit_or_vegetable",
//   },

//   {
//     level: 9,
//     type: "drag_sort",

//     objectCount: 4,
//     targetCount: 2,

//     features: {
//       color: true,
//       shape: false,
//       size: true,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "size",
//   },

//   {
//     level: 10,
//     type: "drag_sort",

//     objectCount: 6,
//     targetCount: 4,

//     features: {
//       color: true,
//       shape: true,
//       size: false,
//       number: false,
//       hat: false,
//       pattern: false,
//       category: false,
//     },

//     rule: "same_color_and_shape",
//   },
// ];
