import { AuthScreen } from "@/components/AuthScreen";

export default function SignIn() {
  return (
    <AuthScreen
      title="Welcome back"
      subtitle="Continue your language journey ✨"
      submitLabel="Sign In"
      showPassword={false}
      footerText="Don't have an account?"
      footerLinkLabel="Sign up"
      footerLinkHref="/sign-up"
    />
  );
}
