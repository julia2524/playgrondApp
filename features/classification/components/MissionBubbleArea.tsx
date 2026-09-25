import { MissionBubble, MissionText } from "../styles/classificationStyles";
import { getShapeIdFromPool, SHAPE_NAMES } from "../shape/constants/shapePool";
import { COLOR_NAMES } from "../color/constants/colorPool";
import { CategoryGameObjects } from "../category/constants/categoryPool";
import { appendJosa } from "../../../utils/appendJosa";
import i18n from "../../../i18n";

interface MissionBubbleProps {
  feedback: string | null;
  target: any;
  gameType: "color" | "shape" | "category";
}

export default function MissionBubbleArea({
  feedback,
  target,
  gameType,
}: MissionBubbleProps) {
  // 📌 1. 진입점 확인용 콘솔 로그 (터미널/디버거에서 바로 확인 가능)
  // console.log("📌 [MissionBubbleArea Check]", { gameType, target, feedback });
  const getMessage = () => {
    // ==========================================
    // 정답 / 오답 피드백이 있으면 최우선
    // ==========================================
    if (feedback) return feedback;

    const currentLanguage = i18n.locale || "ko";

    // ==========================================
    // 색깔 찾기
    // ==========================================
    if (gameType === "color") {
      const colorKey = target?.color ? `color_name_${target.color}` : "";
      const translatedColor = colorKey
        ? i18n.t(colorKey, { defaultValue: "" })
        : "";
      const colorName = translatedColor || i18n.t("color_name_red");

      return i18n.t("mission_color", { color: colorName });
    }

    // ==========================================
    // 종류 분류
    // ==========================================

    if (gameType === "category") {
      // 1. target.items[0]으로 원본 객체 검색
      const rawKey = target?.items?.[0];
      const originalTarget = CategoryGameObjects.find(
        (object) => object.id === rawKey || object.svgKey === rawKey,
      );

      const itemId = originalTarget?.id || rawKey;
      const top = originalTarget?.topCategory;
      const sub = originalTarget?.subCategory;

      // 2. 실제 번역 JSON 키 포맷과 정확히 일치하는 후보 키 작성
      const keyCandidates = [
        // 1) Full Key: 예) sticker_category_vehicle_rail_train_name
        top && sub ? `sticker_category_${top}_${sub}_${itemId}_name` : null,

        // 2) Top Category + ID: 예) sticker_category_animal_pig_name / category_item_animal_pig
        top ? `sticker_category_${top}_${itemId}_name` : null,
        top ? `category_item_${top}_${itemId}` : null,

        // 3) ID 단독 Key: 예) category_item_pig / sticker_category_pig_name
        `category_item_${itemId}`,
        `sticker_category_${itemId}_name`,
        `sticker_${itemId}_name`,
      ].filter(Boolean) as string[];

      // 3. 현재 설정된 언어에서 번역어 찾기
      let categoryName = "";
      for (const key of keyCandidates) {
        const translated = i18n.t(key, { defaultValue: "" });
        // 번역이 존재하고 missing 문구가 없을 때 채택
        if (translated && !translated.includes("missing")) {
          categoryName = translated;
          break;
        }
      }

      // 4. 번역을 찾지 못했울 때만 fallback (i18n.t("category_default_name")도 언어 반영)
      if (!categoryName) {
        categoryName = i18n.t("category_default_name", {
          defaultValue: originalTarget?.name || "종류",
        });
      }

      // 5. 한국어일 경우에만 조사(이야/야) 처리
      const currentLanguage = i18n.locale || "ko";
      if (currentLanguage.startsWith("ko")) {
        categoryName = appendJosa(categoryName, ["이야", "야"]);
      }

      // 6. 다국어 미션 템플릿 반환
      return i18n.t("mission_category", { name: categoryName });
    }
    // ==========================================
    // 모양 찾기
    // ==========================================

    // if (gameType === "shape") {
    //   const rawShapeKey = target?.items?.[target?.missingIndex ?? 0];

    //   const shapeKeyMap: Record<string, string> = {
    //     circle: "shape_name_circle",
    //     square: "shape_name_square",
    //     triangle: "shape_name_triangle",
    //     heart: "shape_name_heart",
    //     star: "shape_name_star",
    //   };

    //   const translationKey = shapeKeyMap[rawShapeKey] ?? "shape_default_name";
    //   const currentLanguage = i18n.locale || "ko";

    //   // 1. i18n 번역 조회
    //   let shapeName = i18n.t(translationKey, { defaultValue: "" });

    //   // 2. 한국어인데 영어("Heart", "Circle" 등)가 반환되었거나 번역에 실패한 경우 방어!
    //   const isEnglishResult = /^[A-Za-z]+$/.test(shapeName); // 영문 단어인지 체크

    //   if (currentLanguage.startsWith("ko") && (isEnglishResult || !shapeName)) {
    //     // SHAPE_NAMES 객체("heart" -> "하트")에서 강제로 한글 이름을 가져옵니다.
    //     shapeName = SHAPE_NAMES[rawShapeKey] || "모양";
    //   }

    //   // 3. 만약 다른 언어에서도 번역을 못 찾은 경우 기본값
    //   if (!shapeName) {
    //     shapeName = rawShapeKey || "모양";
    //   }

    //   // console.log("📌 [Shape i18n Fixed]", {
    //   //   locale: currentLanguage,
    //   //   rawShapeKey,
    //   //   shapeName,
    //   // });

    //   return i18n.t("mission_shape", {
    //     shape: shapeName,
    //     defaultValue: `${shapeName} 모양이야! 같은 모양을 쏙 넣어보자!`,
    //   });
    // }
    if (gameType === "shape") {
      // 💡 1. target 객체에서 원본 아이템 ID 추출 ("window", "pyramid", "window1" 등)
      const rawItemKey =
        target?.items?.[target?.missingIndex ?? 0] ||
        target?.items?.[0] ||
        target?.shapeId ||
        target?.shape ||
        target?.id;

      // 💡 2. SHAPE_ITEM_POOL에서 rawItemKey로 shapeId("square", "triangle" 등)를 자동 탐색!
      // 만약 target에 이미 shapeId가 들어있다면 그걸 우선 쓰고, 없으면 Pool에서 룩업!
      const baseShapeKey = target?.shapeId || getShapeIdFromPool(rawItemKey);

      // 💡 3. 기본 5대 도형 번역 키 매핑
      const shapeKeyMap: Record<string, string> = {
        circle: "shape_name_circle",
        square: "shape_name_square",
        triangle: "shape_name_triangle",
        heart: "shape_name_heart",
        star: "shape_name_star",
      };

      const translationKey =
        shapeKeyMap[baseShapeKey] ?? `shape_name_${baseShapeKey}`;

      // 💡 4. i18n 번역 조회
      let shapeName = translationKey
        ? i18n.t(translationKey, { defaultValue: "" })
        : "";

      // 💡 5. 한국어 fallback (SHAPE_NAMES에서 "square" -> "네모" 가져오기)
      const isEnglishResult = /^[A-Za-z]+$/.test(shapeName);
      if (
        currentLanguage.startsWith("ko") &&
        (isEnglishResult || !shapeName || shapeName.includes("missing"))
      ) {
        shapeName = SHAPE_NAMES[baseShapeKey] || "";
      }

      // 📌 [디버그 로그] Pool 기반 자동 매핑 결과 확인
      console.log("🔍 [Shape Debug Pool Auto-Lookup]", {
        rawItemKey,
        mappedShapeId: baseShapeKey,
        resolvedShapeName: shapeName,
        locale: currentLanguage,
      });

      // 💡 6. 최종 메시지 구성
      if (!shapeName) {
        return i18n.t("mission_shape_default", {
          defaultValue: "같은 모양을 쏙 넣어보자!",
        });
      }

      let finalMessage = i18n.t("mission_shape", {
        shape: shapeName,
        defaultValue: `${shapeName} 모양이야! 같은 모양을 쏙 넣어보자!`,
      });

      // "네모 모양 모양이야" 같은 중복 발음 방어
      return finalMessage.replace(/모양\s*모양/g, "모양");
    }
  };
  return (
    <MissionBubble>
      <MissionText>{getMessage()}</MissionText>
    </MissionBubble>
  );
}
