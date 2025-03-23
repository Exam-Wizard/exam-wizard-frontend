import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  type: z.enum(["student", "faculty", "admin"]),
});

export type User = z.infer<typeof UserSchema>;

export const FacultySchema = UserSchema.extend({
  type: z.literal("faculty"),
  designation: z.string(),
});

export type Faculty = z.infer<typeof FacultySchema>;

export const TokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

export type Tokens = z.infer<typeof TokenSchema>;

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const LoginResponseSchema = z.object({
  user: UserSchema,
  tokens: TokenSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
