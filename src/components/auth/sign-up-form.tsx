"use client";

import { cn, getUrl } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "@/components/icons";

export function SignUpForm({
  className,
  nextPath = "/",
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { nextPath?: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: getUrl(nextPath),
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getUrl(
            `/auth/callback${
              nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""
            }`,
          ),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google",
      );
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: getUrl(
            `/auth/callback${
              nextPath ? `?next=${encodeURIComponent(nextPath)}` : ""
            }`,
          ),
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Facebook",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                <Icons.google className="w-5 h-5" />
                <span className="w-32 text-left">Sign up with Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border border-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                onClick={handleFacebookSignIn}
              >
                <Icons.facebook className="w-5 h-5" />
                <span className="w-32 text-left">Sign up with Facebook</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">OR</span>
              </div>
            </div>

            <form onSubmit={handleSignUp}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="repeat-password">Repeat Password</Label>
                  </div>
                  <Input
                    id="repeat-password"
                    type="password"
                    required
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating an account..." : "Sign up"}
                </Button>
              </div>
            </form>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-gray-900 hover:text-gray-700 underline underline-offset-4"
              >
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
