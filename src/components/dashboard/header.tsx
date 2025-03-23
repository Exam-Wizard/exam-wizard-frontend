"use client";

import { useEffect, useState } from "react";
import { Bell, LogOut } from "lucide-react";

import { UserCard } from "./user-avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { User } from "@/validators/auth";
import { useAuth } from "@/hooks/auth";
import { ExtendedFC } from "@/types/react";

export const DashboardHeader: ExtendedFC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <header className="flex h-16 items-center justify-end border-b px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>{currentUser !== null && <UserCard user={currentUser} />}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
