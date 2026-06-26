import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getProfileInitials, uploadProfileAvatar } from "@/lib/profile-avatar";
import { toast } from "sonner";

type ProfileAvatarProps = {
  userId: string;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  size?: "sm" | "lg";
  editable?: boolean;
  onUploaded?: (url: string) => void;
  className?: string;
};

const sizeClasses = {
  sm: "h-10 w-10 rounded-xl",
  lg: "h-24 w-24 sm:h-28 sm:w-28 rounded-full",
};

export function ProfileAvatar({
  userId,
  name,
  email,
  avatarUrl,
  size = "sm",
  editable = false,
  onUploaded,
  className,
}: ProfileAvatarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const initials = getProfileInitials(name, email);

  async function handleFile(file: File | undefined) {
    if (!file || !editable) return;
    setUploading(true);
    try {
      const url = await uploadProfileAvatar(userId, file);
      onUploaded?.(url);
      toast.success("Photo de profil mise à jour");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Impossible d'envoyer la photo");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const avatar = (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={avatarUrl ?? undefined} alt={name ?? "Photo de profil"} />
      <AvatarFallback
        className={cn(
          "font-bold text-primary-foreground",
          size === "sm" ? "rounded-xl gradient-primary text-sm" : "rounded-full gradient-primary text-2xl",
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );

  if (!editable) return avatar;

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "group relative rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          uploading && "opacity-70 pointer-events-none",
        )}
        aria-label="Modifier la photo de profil"
      >
        {avatar}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition group-hover:opacity-100",
            size === "sm" ? "rounded-xl" : "rounded-full",
          )}
        >
          {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Camera className="h-6 w-6" />}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        onChange={(e) => void handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
