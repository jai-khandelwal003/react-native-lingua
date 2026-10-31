import { AuthScreen } from "@/components/AuthScreen";

export default function SignUp() {
  return (
    <AuthScreen
      title="Create your account"
      subtitle="Start your language journey today ✨"
      submitLabel="Sign Up"
      showPassword
      footerText="Already have an account?"
      footerLinkLabel="Log in"
      footerLinkHref="/sign-in"
    />
  );
}
