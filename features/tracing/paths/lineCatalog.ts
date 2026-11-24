import type { TracingLineType } from "../types/tracing.types";

/**
 * 20개 스테이지 정보 + 판정 설정
 *
 * 새 스테이지/난이도를 추가할 때는 pathGenerators와 이 목록만 고치면 된다.
 * (스테이지 번호 = 배열 순서 + 1)
 */

export type TracingLineGroup = "A" | "B" | "C" | "D";

export interface TracingLineInfo {
  type: TracingLineType;
  /** 스테이지 번호 (01~20) */
  no: string;
  group: TracingLineGroup;
  /** 선택 칩에 보이는 짧은 이름 */
  shortLabel: string;
  /** 정식 이름 */
  title: string;
  /** 미션 문구 */
  mission: string;
  /** 보조 안내 문구 */
  hint: string;
  /** 곡선/복잡한 경로는 순서 판정을 켠다. 기존 직선은 기존 동작 그대로. */
  ordered: boolean;
  /** 기본 허용 거리에 곱하는 배율 (곡선은 아이가 따라가기 쉽게 조금 넉넉하게) */
  toleranceScale: number;
}

export const LINE_GROUP_LABEL: Record<TracingLineGroup, string> = {
  A: "직선",
  B: "곡선",
  C: "방향 전환",
  D: "회전",
};

const straight = {
  group: "A" as const,
  ordered: false,
  toleranceScale: 1,
};

const curved = {
  ordered: true,
  toleranceScale: 1.2,
};

const LINES: Omit<TracingLineInfo, "no">[] = [
  {
    type: "horizontal",
    ...straight,
    shortLabel: "가로선",
    title: "가로선",
    mission: "팬더 친구를 만나러 가자!",
    hint: "점선을 따라 옆으로 쭉~ 그려봐",
  },
  {
    type: "vertical",
    ...straight,
    shortLabel: "세로선",
    title: "세로선",
    mission: "팬더가 나무에서 내려와요!",
    hint: "위에서 아래로 쭉~ 그려봐",
  },
  {
    type: "ascending",
    ...straight,
    shortLabel: "올라가는 사선",
    title: "올라가는 사선",
    mission: "팬더가 언덕을 올라가요!",
    hint: "오른쪽 위로 올라가 봐",
  },
  {
    type: "descending",
    ...straight,
    shortLabel: "내려가는 사선",
    title: "내려가는 사선",
    mission: "팬더가 미끄럼틀을 타요!",
    hint: "오른쪽 아래로 미끄러져 봐",
  },
  {
    type: "vertical_curve_right",
    group: "B",
    ...curved,
    shortLabel: "세로 곡선 ▷",
    title: "오른쪽으로 볼록한 세로 곡선",
    mission: "팬더가 나무 사이로 지나가요!",
    hint: "위에서 아래로 오른쪽으로 휘어져요",
  },
  {
    type: "vertical_curve_left",
    group: "B",
    ...curved,
    shortLabel: "세로 곡선 ◁",
    title: "왼쪽으로 볼록한 세로 곡선",
    mission: "팬더가 나무 사이로 지나가요!",
    hint: "위에서 아래로 왼쪽으로 휘어져요",
  },
  {
    type: "horizontal_curve_up",
    group: "B",
    ...curved,
    shortLabel: "가로 곡선 ⌒",
    title: "위로 볼록한 가로 곡선",
    mission: "팬더가 무지개 다리를 건너요!",
    hint: "위로 둥글게 올라갔다 내려와 봐",
  },
  {
    type: "horizontal_curve_down",
    group: "B",
    ...curved,
    shortLabel: "가로 곡선 ⌣",
    title: "아래로 볼록한 가로 곡선",
    mission: "팬더가 그네를 타요!",
    hint: "아래로 둥글게 내려갔다 올라와 봐",
  },
  {
    type: "meander_horizontal",
    group: "C",
    ...curved,
    shortLabel: "가로 구불구불",
    title: "가로 구불구불선",
    mission: "팬더가 숲속 길을 걸어가요!",
    hint: "구불구불 천천히 따라가 봐",
  },
  {
    type: "meander_vertical",
    group: "C",
    ...curved,
    shortLabel: "세로 구불구불",
    title: "세로 구불구불선",
    mission: "팬더가 산길을 내려가요!",
    hint: "구불구불 천천히 내려가 봐",
  },
  {
    type: "wave_horizontal",
    group: "C",
    ...curved,
    shortLabel: "가로 물결",
    title: "가로 물결선",
    mission: "팬더가 파도를 따라가요!",
    hint: "출렁출렁 파도를 따라가 봐",
  },
  {
    type: "wave_vertical",
    group: "C",
    ...curved,
    shortLabel: "세로 물결",
    title: "세로 물결선",
    mission: "팬더가 폭포 옆을 내려가요!",
    hint: "출렁출렁 아래로 따라가 봐",
  },
  {
    type: "bounce_up",
    group: "C",
    ...curved,
    shortLabel: "깡충 ∩",
    title: "위로 솟는 깡충선",
    mission: "팬더가 깡충깡충 뛰어요!",
    hint: "폴짝폴짝 언덕을 넘어 봐",
  },
  {
    type: "bounce_down",
    group: "C",
    ...curved,
    shortLabel: "깡충 ∪",
    title: "아래로 파이는 깡충선",
    mission: "팬더가 웅덩이를 건너뛰어요!",
    hint: "퐁당퐁당 웅덩이를 따라가 봐",
  },
  {
    type: "zigzag_horizontal",
    group: "C",
    ...curved,
    shortLabel: "가로 뾰족",
    title: "가로 뾰족선",
    mission: "팬더가 산봉우리를 넘어가요!",
    hint: "뾰족뾰족 산을 따라가 봐",
  },
  {
    type: "zigzag_vertical",
    group: "C",
    ...curved,
    shortLabel: "세로 뾰족",
    title: "세로 뾰족선",
    mission: "팬더가 산을 내려와요!",
    hint: "뾰족뾰족 아래로 따라가 봐",
  },
  {
    type: "loop_down",
    group: "D",
    ...curved,
    shortLabel: "뱅글 ↓",
    title: "위에서 아래로 가는 세로 뱅글선",
    mission: "팬더가 덩굴을 타고 내려와요!",
    hint: "뱅글뱅글 고리를 그리며 내려가 봐",
  },
  {
    type: "loop_up",
    group: "D",
    ...curved,
    shortLabel: "뱅글 ↑",
    title: "아래에서 위로 가는 세로 뱅글선",
    mission: "팬더가 덩굴을 타고 올라가요!",
    hint: "뱅글뱅글 고리를 그리며 올라가 봐",
  },
  {
    type: "spiral_in",
    group: "D",
    ...curved,
    shortLabel: "달팽이 안으로",
    title: "바깥에서 안쪽으로 가는 달팽이 나선",
    mission: "팬더가 달팽이 집을 찾아가요!",
    hint: "빙글빙글 안으로 들어가 봐",
  },
  {
    type: "spiral_out",
    group: "D",
    ...curved,
    shortLabel: "달팽이 밖으로",
    title: "안쪽에서 바깥쪽으로 가는 달팽이 나선",
    mission: "팬더가 달팽이 집에서 나와요!",
    hint: "빙글빙글 밖으로 나와 봐",
  },
];

export const TRACING_LINES: TracingLineInfo[] = LINES.map((line, index) => ({
  ...line,
  no: String(index + 1).padStart(2, "0"),
}));

export const getLineInfo = (type: TracingLineType): TracingLineInfo => {
  const info = TRACING_LINES.find((line) => line.type === type);

  if (!info) {
    throw new Error(`알 수 없는 선 유형: ${type}`);
  }

  return info;
};
