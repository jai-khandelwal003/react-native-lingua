import { SpeechBubble } from "@/components/SpeechBubble";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// SafeAreaView doesn't support className, so it's the only element styled here with StyleSheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export default function Onboarding() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Logo */}
      <View className="mt-4 flex-row items-center justify-center">
        <Image
          source={images.mascotLogo}
          className="-my-2 -mr-3 h-[76px] w-[76px]"
          resizeMode="contain"
        />
        <Text className="font-poppins-semibold text-h1 text-text-primary">
          lingua
        </Text>
      </View>

      {/* Headline */}
      <View className="mt-12 px-9">
        <Text className="font-poppins-bold text-h1 leading-[1.5] text-text-primary">
          Your AI language{"\n"}
          <Text className="text-lingua-deep-purple">teacher</Text>.
        </Text>
        <Text className="body-lg mt-3 leading-[1.8] text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>
      </View>

      {/* Illustration */}
      <View className="mt-4 flex-1">
        <SpeechBubble
          label="¡Hola!"
          tone="violet"
          tailSide="left"
          className="absolute right-11 top-0 rotate-6"
        />
        <SpeechBubble
          label="Hello!"
          tone="blue"
          tailSide="right"
          className="absolute left-10 top-5 -rotate-6"
        />
        <SpeechBubble
          label="你好!"
          tone="peach"
          tailSide="left"
          className="absolute right-5 top-24 rotate-6"
        />

        <View className="absolute inset-0 items-center">
          <View className="absolute bottom-0 h-6 w-[60%] rounded-full bg-text-primary/5" />
          <Image
            source={images.mascotWelcome}
            className="absolute -bottom-[11%] aspect-square h-[112%]"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Call to action */}
      <View className="px-6 pb-6 pt-4">
        <TouchableOpacity
          className="btn-primary"
          activeOpacity={0.85}
          onPress={() => router.push("/sign-up")}
        >
          <Text className="pr-9 text-center font-poppins-semibold text-h3 text-white">
            Get Started
          </Text>
          <View className="absolute right-9 h-3 w-3 rotate-45 border-r-2 border-t-2 border-white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
