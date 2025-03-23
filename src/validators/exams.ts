import { z } from "zod";

export const CreateExamPayloadSchema = z.object({
  exam_id: z.string(),
  department_id: z.string(),
  subject_id: z.string(),
  total_marks: z.number().nullish(),
  passing_marks: z.number().nullish(),
  session: z.number().nullish(),
  exam_date: z.string(),
});

export type CreateExamPayload = z.infer<typeof CreateExamPayloadSchema>;

export const GetExamResponse = CreateExamPayloadSchema.extend({
  id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type GetExam = z.infer<typeof GetExamResponse>;

export const CreateExamWorkflowStageBodySchema = z.object({
  name: z.string(),
  order: z.number(),
  assignee_id: z.string(),
  status: z.enum(["pending", "ongoing", "completed"]).default("pending"),
});

export type CreateExamWorkflowStagePayload = z.infer<
  typeof CreateExamWorkflowStageBodySchema
>;

export const GetExamWorkflowStageResponse =
  CreateExamWorkflowStageBodySchema.extend({
    id: z.string(),
    exam_id: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
  });

export type GetExamWorkflowStage = z.infer<typeof GetExamWorkflowStageResponse>;
