//Level 1~30의 문제 규칙 설정

import { ClassificationLevel } from "./types";

export const classificationLevels: ClassificationLevel[] = [
  {
    level: 1,
    type: "drag_sort",

    objectCount: 2,
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

    rule: "same_color",
  },

  {
    level: 2,
    type: "drag_sort",

    objectCount: 3,
    targetCount: 1,

    features: {
      color: false,
      shape: true,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "same_shape",
  },

  {
    level: 3,
    type: "drag_sort",

    objectCount: 4,
    targetCount: 1,

    features: {
      color: false,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: true,
    },

    rule: "same_category",
  },

  {
    level: 4,
    type: "drag_sort",

    objectCount: 4,
    targetCount: 1,

    features: {
      color: false,
      shape: false,
      size: true,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "same_size",
  },

  {
    level: 5,
    type: "drag_sort",

    objectCount: 4,
    targetCount: 1,

    features: {
      color: true,
      shape: true,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "same_color_and_shape",
  },
  {
    level: 6,
    type: "drag_sort",

    objectCount: 2,
    targetCount: 2,

    features: {
      color: true,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },
    rule: "same_color",
  },
  {
    level: 7,
    type: "drag_sort",

    objectCount: 3,
    targetCount: 3,

    features: {
      color: true,
      shape: true,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "same_color_and_shape",
  },
  {
    level: 8,
    type: "drag_sort",

    objectCount: 3,
    targetCount: 2,

    features: {
      color: false,
      shape: false,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: true,
    },

    rule: "fruit_or_vegetable",
  },

  {
    level: 9,
    type: "drag_sort",

    objectCount: 4,
    targetCount: 2,

    features: {
      color: true,
      shape: false,
      size: true,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "size",
  },

  {
    level: 10,
    type: "drag_sort",

    objectCount: 6,
    targetCount: 4,

    features: {
      color: true,
      shape: true,
      size: false,
      number: false,
      hat: false,
      pattern: false,
      category: false,
    },

    rule: "same_color_and_shape",
  },
];
