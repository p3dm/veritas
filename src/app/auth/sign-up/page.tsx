import { SignUpForm } from "@/components/auth/sign-up-form";

export default function Page() {
  return (
    <div className="w-full max-w-sm">
      <SignUpForm nextPath="/ielts/dashboard" />
    </div>
  );
}
