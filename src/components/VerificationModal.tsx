import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CODE_LENGTH = 6;

// Modal, KeyboardAvoidingView and TextInput props can't be set with className, so they use StyleSheet
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "rgba(13, 19, 43, 0.5)",
  },
  // Invisible input stretched over the boxes so tapping them opens the number pad
  hiddenInput: {
    ...StyleSheet.absoluteFill,
    opacity: 0,
  },
});

type VerificationModalProps = {
  visible: boolean;
  email: string;
  onClose: () => void;
  // Called once the last digit has been entered
  onComplete: () => void;
};

export function VerificationModal({
  visible,
  email,
  onClose,
  onComplete,
}: VerificationModalProps) {
  const [code, setCode] = useState("");

  const close = () => {
    setCode("");
    onClose();
  };

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, "").slice(0, CODE_LENGTH);
    setCode(digits);

    if (digits.length === CODE_LENGTH) {
      setCode("");
      onComplete();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={close}
    >
      {/* Pushes the card up so it stays above the keyboard */}
      <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={close}
          accessibilityLabel="Close"
        />

        <View className="card items-center">
          <Text className="h2 text-center text-text-primary">
            Check your email
          </Text>
          <Text className="body-md mt-2 text-center text-text-secondary">
            We sent a verification code to{"\n"}
            <Text className="font-poppins-semibold text-text-primary">
              {email.trim() || "your email"}
            </Text>
            {"\n"}Enter the 6-digit code below.
          </Text>

          <View className="mt-6 flex-row gap-2">
            {Array.from({ length: CODE_LENGTH }, (_, index) => {
              const isActive = index === Math.min(code.length, CODE_LENGTH - 1);

              return (
                <View
                  key={index}
                  className={`otp-box ${
                    isActive ? "border-lingua-deep-purple" : "border-border"
                  }`}
                >
                  <Text className="font-poppins-bold text-h2 text-text-primary">
                    {code[index] ?? ""}
                  </Text>
                </View>
              );
            })}

            <TextInput
              value={code}
              onChangeText={handleChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              maxLength={CODE_LENGTH}
              autoFocus
              caretHidden
              style={styles.hiddenInput}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
