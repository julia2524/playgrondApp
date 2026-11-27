export interface ObjectTracingStage {
  id: string;
  level: number;
  no: string;
  shortLabel: string;
  title: string;
  mission: string;
  hint: string;
  paths: string[];
  scale?: number;
}

const OBJECT_PATHS = {
  // 01. 사과 - 통통하고 둥근 외곽
  apple:
    "M 160 67.2 C 140.8 48 102.4 55.2 88 91.2 C 71.2 134.4 95.2 196.8 160 196.8 C 224.8 196.8 248.8 134.4 232 91.2 C 217.6 55.2 179.2 48 160 67.2 Z",

  // 02. 당근 - 넓은 윗부분에서 뾰족하게 내려오는 외곽
  carrot:
    "M160 65 C198 65 211 79 198 122 C188 157 173 192 160 215 C147 192 132 157 122 122 C109 79 122 65 160 65Z",

  // 03. 물고기 - 둥근 몸통과 꼬리가 연결된 외곽
  fish: "M 50.5 120 C 71.5 60 140.5 39 209.5 75 L 269.5 60 L 263.5 180 L 209.5 165 C 140.5 201 71.5 180 50.5 120 Z",

  // 04. 꽃 -
  flower:
    "M 182.3 67.3 L 180.3 42.8 L 175.9 30.9 L 169.6 22.6 L 161.7 18.6 L 151.4 21.7 L 143.3 32.5 L 138.5 48.7 L 137.7 67.3 L 126.5 56.5 L 113.3 48.3 L 100.7 44.7 L 90.7 46.2 L 86.4 49.8 L 84 55 L 85.1 68.6 L 93 84.3 L 106.3 98.7 L 89.7 99.2 L 73.9 103.3 L 62.5 110.4 L 57.6 119.3 L 60.7 129.6 L 71.5 137.7 L 87.7 142.5 L 106.3 143.3 L 94.2 156.1 L 85.9 171 L 83.6 183.8 L 87.5 193.5 L 96.5 197.3 L 110 195.1 L 124.9 186.8 L 137.7 174.7 L 138.2 191.3 L 142.3 207.1 L 149.4 218.5 L 158.3 223.4 L 168.6 220.3 L 176.7 209.5 L 181.5 193.3 L 182.3 174.7 L 195.1 186.8 L 210 195.1 L 222.8 197.4 L 232.5 193.5 L 236.3 184.5 L 234.1 171 L 225.8 156.1 L 213.7 143.3 L 230.3 142.8 L 246.1 138.7 L 257.5 131.6 L 262.4 122.7 L 259.3 112.4 L 248.5 104.3 L 232.3 99.5 L 213.7 98.7 L 226.4 85.1 L 234.4 70.2 L 236.3 56.9 L 231.7 47.8 L 222.1 44.6 L 209.2 47.2 L 195.1 55.2 L 182.3 67.3 Z",

  // 05. 버섯 - 둥근 갓과 아래쪽 기둥을 포함한 외곽
  mushroom:
    "M 77.5 126 C 80 66 125 38.5 160 38.5 C 195 38.5 240 66 242.5 126 L 190 126 L 200 201 Q 160 218.5 120 201 L 130 126 Z",
  // 06. 집 - 지붕과 몸체가 이어진 외곽
  house: "M 160 25 L 292 130 L 265 130 L 265 220 L 55 220 L 55 130 L 28 130 Z",

  // 07. 돛단배 - 돛과 배가 하나로 이어진 외곽
  sailboat:
    "M 155 25 L 155 145 L 55 145 Z M 175 48 L 175 145 L 265 145 Z M 35 165 L 285 165 L 250 210 C 239 225 220 232 195 232 L 125 232 C 100 232 81 225 70 210 Z",

  // 08. 우산 - 둥근 우산과 손잡이가 연결된 외곽
  umbrella:
    "M 160 25 C 91 25 35 78 25 145 C 49 132 72 133 94 151 C 115 168 138 166 160 145 C 182 166 205 168 226 151 C 248 133 271 132 295 145 C 285 78 229 25 160 25 Z M 150 145 L 150 198 C 150 224 165 235 183 225 C 193 219 196 207 192 197",

  // 09. 자동차 - 차체와 바퀴가 연결된 하나의 외곽
  car: "M 35 150 L 50 105 C 55 89 67 80 84 80 L 112 80 L 145 35 L 220 35 C 238 35 249 45 257 62 L 280 105 L 292 150 L 292 190 C 292 207 280 220 263 220 L 245 220 C 228 220 215 207 215 190 L 105 190 C 105 207 92 220 75 220 L 65 220 C 48 220 35 207 35 190 Z",

  // 10. 열기구 - 둥근 풍선과 아래 바구니가 이어진 외곽
  hotAirBalloon:
    "M 160 18 C 91 18 45 72 45 132 C 45 169 67 195 98 207 L 120 220 L 120 230 L 200 230 L 200 220 L 222 207 C 253 195 275 169 275 132 C 275 72 229 18 160 18 Z",
};

export const OBJECT_STAGES: ObjectTracingStage[] = [
  {
    id: "apple",
    level: 1,
    no: "01",
    shortLabel: "사과",
    title: "맛있는 사과",
    mission: "동그란 사과를 그려 봐요!",
    hint: "사과의 바깥쪽을 따라 그려 봐요",
    paths: [OBJECT_PATHS.apple],
    scale: 1.5,
  },
  {
    id: "carrot",
    level: 2,
    no: "02",
    shortLabel: "당근",
    title: "길쭉한 당근",
    mission: "당근을 길쭉하게 그려 봐요!",
    hint: "넓은 곳에서 뾰족한 곳까지 따라가요",
    paths: [OBJECT_PATHS.carrot],
    scale: 1.5,
  },
  {
    id: "fish",
    level: 3,
    no: "03",
    shortLabel: "물고기",
    title: "귀여운 물고기",
    mission: "물고기를 그려 봐요!",
    hint: "물고기의 바깥쪽을 한 바퀴 따라가요",
    paths: [OBJECT_PATHS.fish],
  },
  {
    id: "flower",
    level: 4,
    no: "04",
    shortLabel: "꽃",
    title: "예쁜 꽃",
    mission: "활짝 핀 꽃을 그려 봐요!",
    hint: "꽃잎의 둥근 모양을 따라가요",
    paths: [OBJECT_PATHS.flower],
  },
  {
    id: "mushroom",
    level: 5,
    no: "05",
    shortLabel: "버섯",
    title: "동글동글 버섯",
    mission: "귀여운 버섯을 그려 봐요!",
    hint: "버섯의 바깥선을 따라가요",
    paths: [OBJECT_PATHS.mushroom],
  },
  {
    id: "house",
    level: 6,
    no: "06",
    shortLabel: "집",
    title: "아늑한 집",
    mission: "작은 집을 그려 봐요!",
    hint: "지붕부터 집의 바깥선을 따라가요",
    paths: [OBJECT_PATHS.house],
  },
  {
    id: "sailboat",
    level: 7,
    no: "07",
    shortLabel: "돛단배",
    title: "바다 위 돛단배",
    mission: "돛단배를 그려 봐요!",
    hint: "돛과 배의 바깥선을 따라가요",
    paths: [OBJECT_PATHS.sailboat],
  },
  {
    id: "umbrella",
    level: 8,
    no: "08",
    shortLabel: "우산",
    title: "알록달록 우산",
    mission: "커다란 우산을 그려 봐요!",
    hint: "우산의 둥근 바깥선을 따라가요",
    paths: [OBJECT_PATHS.umbrella],
  },
  {
    id: "car",
    level: 9,
    no: "09",
    shortLabel: "자동차",
    title: "씽씽 자동차",
    mission: "자동차를 그려 봐요!",
    hint: "자동차의 바깥선을 따라가요",
    paths: [OBJECT_PATHS.car],
  },
  {
    id: "hot-air-balloon",
    level: 10,
    no: "10",
    shortLabel: "열기구",
    title: "둥실둥실 열기구",
    mission: "하늘 높이 열기구를 그려 봐요!",
    hint: "커다란 풍선의 바깥선을 따라가요",
    paths: [OBJECT_PATHS.hotAirBalloon],
  },
];
