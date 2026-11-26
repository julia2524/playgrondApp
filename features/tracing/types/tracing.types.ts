// import { DrawingPoint } from "./drawing.types";

// /**
//  * 따라 그리기 가이드
//  */
// export interface TracingGuide {
//   id: string;

//   /**
//    * 가이드 경로를 구성하는 좌표
//    * 이후 곡선도 일정 간격으로 샘플링해서 사용
//    */
//   points: DrawingPoint[];

//   /**
//    * 선에서 벗어나도 인정하는 거리
//    */
//   tolerance?: number;

//   /**
//    * 완성으로 인정할 진행률
//    */
//   completionThreshold?: number;

//   /**
//    * 순서 판정 사용 여부 (기본 false = 기존 동작 그대로)
//    *
//    * true이면 지금까지 완성한 구간 바로 앞쪽(look-ahead 범위)만 인정한다.
//    * 경로가 스스로 교차하거나 고리끼리 가까운 곡선(뱅글/나선 등)에서
//    * 엉뚱한 구간이 먼저 채워지는 것을 막고, 출발 방향도 강제한다.
//    */
//   ordered?: boolean;
// }

// /**
//  * 따라 그리기 진행 상태
//  */
// export interface TracingProgress {
//   /**
//    * 현재 진행률 (0 ~ 1)
//    */
//   progress: number;

//   /**
//    * 완성된 가이드 구간 수
//    */
//   completedPoints: number;

//   /**
//    * 전체 가이드 구간 수
//    */
//   totalPoints: number;

//   /**
//    * 완성 여부
//    */
//   isCompleted: boolean;
// }

// /**
//  * 20개 스테이지의 선 유형 (스테이지 하나 = 유형 하나)
//  *
//  *  1 horizontal              가로선
//  *  2 vertical                세로선
//  *  3 ascending               올라가는 사선
//  *  4 descending              내려가는 사선
//  *  5 vertical_curve_right    오른쪽으로 볼록한 세로 곡선
//  *  6 vertical_curve_left     왼쪽으로 볼록한 세로 곡선
//  *  7 horizontal_curve_up     위로 볼록한 가로 곡선
//  *  8 horizontal_curve_down   아래로 볼록한 가로 곡선
//  *  9 meander_horizontal      가로 구불구불선
//  * 10 meander_vertical        세로 구불구불선
//  * 11 wave_horizontal         가로 물결선
//  * 12 wave_vertical           세로 물결선
//  * 13 bounce_up               위로 솟는 깡충선 (둥근 ∩)
//  * 14 bounce_down             아래로 파이는 깡충선 (둥근 U)
//  * 15 zigzag_horizontal       가로 뾰족선
//  * 16 zigzag_vertical         세로 뾰족선
//  * 17 loop_down               위에서 아래로 가는 세로 뱅글선
//  * 18 loop_up                 아래에서 위로 가는 세로 뱅글선
//  * 19 spiral_in               바깥에서 안쪽으로 가는 달팽이 나선
//  * 20 spiral_out              안쪽에서 바깥쪽으로 가는 달팽이 나선
//  */
// export type TracingLineType =
//   | "horizontal"
//   | "vertical"
//   | "ascending"
//   | "descending"
//   | "vertical_curve_right"
//   | "vertical_curve_left"
//   | "horizontal_curve_up"
//   | "horizontal_curve_down"
//   | "meander_horizontal"
//   | "meander_vertical"
//   | "wave_horizontal"
//   | "wave_vertical"
//   | "bounce_up"
//   | "bounce_down"
//   | "zigzag_horizontal"
//   | "zigzag_vertical"
//   | "loop_down"
//   | "loop_up"
//   | "spiral_in"
//   | "spiral_out";

// /**
//  * 스테이지 하나가 만들어 내는 경로 (렌더링과 판정이 같은 path를 사용)
//  */
// export interface TracingPathConfig {
//   type: TracingLineType;
//   start: DrawingPoint;
//   end: DrawingPoint;
//   path: DrawingPoint[];
// }

// /**
//  * 경로를 만들 때 쓰는 보드(캔버스) 크기
//  */
// export interface TracingBoardSize {
//   width: number;
//   height: number;
// }

// /**
//  * Tracing Engine 설정
//  */
// export interface TracingOptions {
//   tolerance?: number;
//   completionThreshold?: number;
// }

import type { DrawingPoint } from "./drawing.types";

/**
 * 따라 그리기 가이드
 *
 * - line: 기존 points 사용
 * - shape/object: 독립된 paths 사용
 *
 * 기존 선 그리기와의 호환성을 위해 points는 유지한다.
 */
export interface TracingGuide {
  id: string;

  /** 기존 선 그리기용 단일 경로 */
  points: DrawingPoint[];

  /** 도형 및 사물용 독립 경로 배열 */
  paths?: DrawingPoint[][];

  tolerance?: number;
  completionThreshold?: number;
  ordered?: boolean;
}

export interface TracingProgress {
  progress: number;
  completedPoints: number;
  totalPoints: number;
  isCompleted: boolean;
}

export type TracingLineType =
  | "horizontal"
  | "vertical"
  | "ascending"
  | "descending"
  | "vertical_curve_right"
  | "vertical_curve_left"
  | "horizontal_curve_up"
  | "horizontal_curve_down"
  | "meander_horizontal"
  | "meander_vertical"
  | "wave_horizontal"
  | "wave_vertical"
  | "bounce_up"
  | "bounce_down"
  | "zigzag_horizontal"
  | "zigzag_vertical"
  | "loop_down"
  | "loop_up"
  | "spiral_in"
  | "spiral_out";

/**
 * 기존 선 그리기 전용 경로 설정
 */
export interface TracingPathConfig {
  type: TracingLineType;
  start: DrawingPoint;
  end: DrawingPoint;
  path: DrawingPoint[];
}

export interface TracingBoardSize {
  width: number;
  height: number;
}

export interface TracingOptions {
  tolerance?: number;
  completionThreshold?: number;
}

export type TracingGameMode = "line" | "shape" | "object";
