import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getRoleColor, getRoleLabel, User } from "@/types/user";
import { LuMail, LuUser } from "react-icons/lu";

interface ProfileHeaderProps {
  user: User | null;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="sticky top-6 bg-white dark:bg-slate-800 border-none shadow-lg">
      <CardContent className="p-6">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32 border-4 border-blue-500 shadow-md">
            <AvatarImage
              src={user?.profilePicture || "/misc/placeholder.svg"}
              alt={user?.fullName || "Utilisateur"}
            />
            <AvatarFallback className="text-4xl font-semibold"></AvatarFallback>
          </Avatar>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {user?.fullName}
          </h1>
          <Badge
            variant="outline"
            className={`${getRoleColor(
              user?.role
            )} text-sm   text-white border-none`}
          >
            {getRoleLabel(user?.role)}
          </Badge>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-slate-700 my-6" />

        {/* Contact Info */}
        <div className="space-y-4 flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-3">
              <LuUser className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Prénom
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.firstName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LuUser className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Nom
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {user?.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LuMail className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-900 dark:text-white break-all">
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
