"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useSession } from "@clerk/nextjs";
import { useMemo } from "react";

export function useSupabaseClient() {
  const { session } = useSession();

  return useMemo(
    () =>
      createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          async accessToken() {
            return (await session?.getToken()) ?? null;
          },
        },
      ),
    [session],
  );
}
