import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect("/auth/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_url, locale, timezone")
    .eq("user_id", data.user.id)
    .single();

  return (
    <div className="flex-1 flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Username
                </label>
                <p className="text-sm">{profile?.username || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Display Name
                </label>
                <p className="text-sm">{profile?.display_name || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Locale
                </label>
                <p className="text-sm">{profile?.locale || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Timezone
                </label>
                <p className="text-sm">{profile?.timezone || "Not set"}</p>
              </div>
            </div>

            {profile?.avatar_url && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Avatar
                </label>
                <div className="mt-2">
                  <img
                    src={profile?.avatar_url}
                    alt="Profile avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your profile details</h2>
        {profileError ? (
          <pre className="text-xs font-mono p-3 rounded border text-red-600">
            {JSON.stringify(profileError, null, 2)}
          </pre>
        ) : (
          <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>
        )}
      </div>

      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}
