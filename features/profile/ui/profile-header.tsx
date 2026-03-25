import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getRoleColor, getRoleLabel, User } from "@/types/user";
import { LuMail, LuUser } from "react-icons/lu";

interface ProfileHeaderProps {
  user: User | null;
}

/** En-tête du profil utilisateur : avatar, nom, email, rôle. */
export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="sticky top-6 bg-white dark:bg-slate-800 border-none shadow-lg">
      <CardContent className="p-6">
        {/* Image du profil */}
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32 border-4 border-primary shadow-md">
            <AvatarImage
              src={user?.profilePicture || "/misc/placeholder.svg"}
              alt={user?.fullName || "Utilisateur"}
            />
            <AvatarFallback className="text-4xl font-semibold"></AvatarFallback>
          </Avatar>
        </div>

        {/* Infos utilisateur */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground dark:text-white mb-1">
            {user?.fullName}
          </h1>
          <Badge
            variant="outline"
            className={`${getRoleColor(
              user?.role,
            )} text-sm   text-white border-none`}
          >
            {getRoleLabel(user?.role)}
          </Badge>
        </div>

        {/* Séparateur */}
        <div className="h-px bg-border my-6" />

        {/* Coordonnées */}
        <div className="space-y-4 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <LuUser className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium tracking-wide">
                  Prénom
                </p>
                <p className="text-base font-bold text-foreground dark:text-white">
                  {user?.firstName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LuUser className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium tracking-wide">
                  Nom
                </p>
                <p className="text-base font-bold text-foreground dark:text-white">
                  {user?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LuMail className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground font-medium tracking-wide">
                  Email
                </p>
                <p className="text-base font-bold text-foreground dark:text-white break-all">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
