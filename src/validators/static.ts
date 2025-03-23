import { z } from "zod";

export const DepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Department = z.infer<typeof DepartmentSchema>;

export const SubjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  department_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Subject = z.infer<typeof SubjectSchema>;

export const ExamDefinitionSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.enum(["semester", "midterm"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ExamDefinition = z.infer<typeof ExamDefinitionSchema>;
