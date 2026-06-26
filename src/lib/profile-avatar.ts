import { supabase } from "@/integrations/supabase/client";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024;

export function getProfileInitials(name?: string | null, email?: string | null) {
  const fromName = name?.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("");
  if (fromName) return fromName.toUpperCase();
  return email?.[0]?.toUpperCase() ?? "U";
}

export async function uploadProfileAvatar(userId: string, file: File) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format accepté : JPG, PNG ou WebP.");
  }
  if (file.size > MAX_SIZE) {
    throw new Error("Image trop lourde (maximum 2 Mo).");
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${userId}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, {
    upsert: true,
    cacheControl: "3600",
    contentType: file.type,
  });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  const avatarUrl = `${data.publicUrl}?t=${Date.now()}`;

  const { error: profileError } = await supabase.from("profiles").update({
    avatar_url: avatarUrl,
    updated_at: new Date().toISOString(),
  }).eq("id", userId);
  if (profileError) throw profileError;

  return avatarUrl;
}
