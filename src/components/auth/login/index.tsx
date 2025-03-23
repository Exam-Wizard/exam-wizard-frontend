"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/api";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { LoginPayload, LoginSchema } from "@/validators/auth";

export function Login() {
  const router = useRouter();
  const { setUser, setTokens } = useAuth();
  const [email, setEmail] = useQueryState(
    "email",
    parseAsString.withDefault("")
  );
  const [password, setPassword] = useState("");

  const createUser = useMutation({
    mutationFn: (data: LoginPayload) => api.auth.loginFaculty(data),
    onSuccess: ({ user, tokens }) => {
      setUser(user);
      setTokens(tokens);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { success } = LoginSchema.safeParse({ email, password });
    if (!success) {
      toast.error("Invalid email or password");
      return;
    }

    createUser.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.push("/dashboard/exams");
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={createUser.isPending}
            >
              {createUser.isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Contact your admin if you are having trouble signing in
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
