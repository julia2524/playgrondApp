function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "");

  const value =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((char) => char + char)
          .join("")
      : cleaned;

  const number = parseInt(value, 16);

  return {
    r: (number >> 16) & 255,
    g: (number >> 8) & 255,
    b: number & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return (
    "#" +
    [r, g, b]
      .map((value) => {
        const hex = Math.round(Math.max(0, Math.min(255, value))).toString(16);

        return hex.padStart(2, "0");
      })
      .join("")
  );
}

export function lightenColor(hex: string, amount: number = 0.2) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

export function darkenColor(hex: string, amount: number = 0.2) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

export function getColorVariants(colorHex: string) {
  return {
    base: colorHex,
    light: lightenColor(colorHex, 0.2),
    dark: darkenColor(colorHex, 0.25),
    darker: darkenColor(colorHex, 0.35),
    darkest: darkenColor(colorHex, 0.4),
  };
}
