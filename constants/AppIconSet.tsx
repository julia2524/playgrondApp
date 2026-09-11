import Ionicons from "@expo/vector-icons/Ionicons";

export const AppIconSet = {
  // ☁️ 구름
  Cloud: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="cloud" size={size} color="#60A5FA" />
  ),

  // 🎨 팔레트 (색깔 모험)
  Palette: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="color-palette" size={size} color="#FF6B6B" />
  ),

  // 🔷 도형 (모양 모험)
  Shape: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="shapes" size={size} color="#3B82F6" />
  ),

  // 🥑 종류/카테고리 (종류 모험)
  Category: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="grid" size={size} color="#4ADE80" />
  ),

  // ✨ 반짝임 (칭찬/보상)
  Sparkles: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="sparkles" size={size} color="#FBBF24" />
  ),

  // 🔊 효과음 (설정)
  Sound: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="volume-high" size={size} color="#8B5CF6" />
  ),

  // 🎵 배경음악 (설정)
  Music: ({ size = 24 }: { size?: number }) => (
    <Ionicons name="musical-notes" size={size} color="#F43F5E" />
  ),
};
