import { ExtendedFC } from "@/types/react";
import { User } from "@/validators/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

export const UserCard: ExtendedFC<{ user: User }> = ({ user }) => {
  return (
    <div className="flex cursor-pointer items-center space-x-3 rounded-md p-2 hover:bg-accent">
      <Avatar>
        <AvatarImage src={user?.id} alt={user?.first_name} />
        <AvatarFallback>{user?.first_name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="text-sm font-medium">
          {user?.first_name + " " + user?.last_name}
        </p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>
      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </div>
  );
};
