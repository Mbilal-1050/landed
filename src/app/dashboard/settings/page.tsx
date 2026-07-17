import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user!.id)
    .single();

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 sm:px-10">
      <h1 className="mb-8 font-display text-3xl text-fog">Settings</h1>
      <SettingsForm initialName={profile?.full_name ?? ""} email={user!.email ?? ""} />
    </main>
  );
}
