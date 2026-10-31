import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="h2 text-center color-lingua-purple">Lingua</Text>

      <Link href="/onboarding" asChild>
        <TouchableOpacity className="btn-primary w-full" activeOpacity={0.85}>
          <Text className="text-center font-poppins-semibold text-h3 text-white">
            Open onboarding
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
