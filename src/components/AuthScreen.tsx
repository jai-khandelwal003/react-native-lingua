import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { colors } from "@/theme/colors";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// SafeAreaView and ScrollView don't take className for these props, so they use StyleSheet
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

const socialProviders = [
  { label: "Continue with Google", icon: images.googleLogo },
  { label: "Continue with Facebook", icon: images.facebookLogo },
  { label: "Continue with Apple", icon: images.appleLogo },
];

type AuthScreenProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  // Sign Up has a password field, Sign In doesn't
  showPassword: boolean;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: Href;
};

export function AuthScreen({
  title,
  subtitle,
  submitLabel,
  showPassword,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: AuthScreenProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const handleVerified = () => {
    setIsVerificationOpen(false);
    router.replace("/");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity
          className="ml-3 mt-2 h-11 w-11 justify-center pl-3"
          activeOpacity={0.6}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <View className="h-3.5 w-3.5 rotate-45 border-b-2 border-l-2 border-text-primary" />
        </TouchableOpacity>

        {/* Heading */}
        <View className="mt-3 px-6">
          <Text className="font-poppins-bold text-h2 text-text-primary">
            {title}
          </Text>
          <Text className="body-md mt-1 text-text-secondary">{subtitle}</Text>
        </View>

        {/* Mascot peeking over the first field */}
        <View className="h-[122px] items-center overflow-hidden">
          <Image
            source={images.mascotAuth}
            className="-mt-9 h-[218px] w-[218px] -scale-x-100"
            resizeMode="contain"
          />
          <Text className="absolute left-[104px] top-[22px] text-[18px] text-[#F5A623]">
            ✦
          </Text>
          <Text className="absolute right-[96px] top-[28px] text-[16px] text-lingua-blue">
            ✦
          </Text>
          <Text className="absolute right-[108px] top-[64px] text-[18px] text-warning">
            ✦
          </Text>
        </View>

        {/* Form */}
        <View className="gap-3.5 px-6">
          <View className="auth-input">
            <Text className="body-sm text-text-secondary">Email</Text>
            <TextInput
              className="h-7 p-0 font-poppins-medium text-body-lg text-text-primary"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              underlineColorAndroid="transparent"
            />
          </View>

          {showPassword ? (
            <View className="auth-input">
              <Text className="body-sm text-text-secondary">Password</Text>
              <TextInput
                className="h-7 p-0 pr-10 font-poppins-medium text-body-lg text-text-primary"
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect={false}
                underlineColorAndroid="transparent"
              />
              <TouchableOpacity
                className="absolute right-5 top-3.5 h-11 w-11 items-end justify-center"
                activeOpacity={0.6}
                onPress={() => setIsPasswordVisible((visible) => !visible)}
                accessibilityLabel={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
              >
                <Image
                  source={isPasswordVisible ? images.eyeOff : images.eye}
                  className="h-6 w-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View className="mt-5 px-6">
          <TouchableOpacity
            className="auth-button"
            activeOpacity={0.85}
            onPress={() => setIsVerificationOpen(true)}
          >
            <Text className="font-poppins-semibold text-h3 text-white">
              {submitLabel}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View className="mt-5 flex-row items-center gap-4 px-6">
          <View className="h-px flex-1 bg-border" />
          <Text className="body-md text-text-secondary">or continue with</Text>
          <View className="h-px flex-1 bg-border" />
        </View>

        {/* Social auth */}
        <View className="mt-4 gap-2 px-6">
          {socialProviders.map((provider) => (
            <TouchableOpacity
              key={provider.label}
              className="auth-social"
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Image
                source={provider.icon}
                className="h-6 w-6"
                resizeMode="contain"
              />
              <Text className="ml-8 font-poppins-medium text-body-lg text-text-primary">
                {provider.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View className="flex-1 justify-end pb-6 pt-8">
          <Text className="body-md text-center text-text-secondary">
            {footerText}{" "}
            <Text
              className="font-poppins-medium text-lingua-deep-purple"
              onPress={() => router.replace(footerLinkHref)}
            >
              {footerLinkLabel}
            </Text>
          </Text>
        </View>
      </ScrollView>

      <VerificationModal
        visible={isVerificationOpen}
        email={email}
        onClose={() => setIsVerificationOpen(false)}
        onComplete={handleVerified}
      />
    </SafeAreaView>
  );
}
