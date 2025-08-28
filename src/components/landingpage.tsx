import { Background } from "./ui/background";
import { AuthButton } from "./auth/auth-button";

export function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Background src="/bg2.mp4" />
      <nav className="relative z-10 w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <span>Veritas English</span>
          </div>
          <AuthButton />
        </div>
      </nav>
    </div>
  );
}
