import { Text, View } from "react-native";

// Full class names so Tailwind can see them. Each tone styles the bubble, its tail and its text.
const tones = {
  blue: { bg: "bg-[#EAF3FF]", text: "text-text-primary" },
  violet: { bg: "bg-[#F2F3FF]", text: "text-[#3A2FE0]" },
  peach: { bg: "bg-[#FDEEE9]", text: "text-[#E5432B]" },
} as const;

type SpeechBubbleProps = {
  label: string;
  tone: keyof typeof tones;
  tailSide: "left" | "right";
  // Position and rotation, e.g. "absolute top-0 left-10 -rotate-6"
  className?: string;
};

export function SpeechBubble({
  label,
  tone,
  tailSide,
  className = "",
}: SpeechBubbleProps) {
  const { bg, text } = tones[tone];

  return (
    <View className={`speech-bubble ${bg} ${className}`}>
      <View
        className={`speech-bubble__tail ${bg} ${
          tailSide === "left" ? "left-5" : "right-5"
        }`}
      />
      <Text className={`font-poppins-medium text-h3 ${text}`}>{label}</Text>
    </View>
  );
}
