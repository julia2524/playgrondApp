import i18n from "../i18n";

export const GAME_INFO = {
  color: {
    iconName: "color-palette",
    get title() {
      return i18n.t("game_color_full_title");
    },
    get description() {
      return i18n.t("game_color_reset_desc");
    },
    get stickerDescription() {
      return i18n.t("game_color_sticker_desc");
    },
  },

  shape: {
    iconName: "diamond",
    get title() {
      return i18n.t("game_shape_full_title");
    },
    get description() {
      return i18n.t("game_shape_reset_desc");
    },
    get stickerDescription() {
      return i18n.t("game_shape_sticker_desc");
    },
  },

  category: {
    iconName: "fast-food",
    get title() {
      return i18n.t("game_category_full_title");
    },
    get description() {
      return i18n.t("game_category_reset_desc");
    },
    get stickerDescription() {
      return i18n.t("game_category_sticker_desc");
    },
  },
};
