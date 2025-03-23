import type { API } from ".";
import {
  CreateExamPayload,
  CreateExamPayloadSchema,
  CreateExamWorkflowStagePayload,
  GetExamResponse,
  GetExamWorkflowStageResponse,
} from "@/validators/exams";

export class ExamsAPI {
  public routes = {
    createExams: "/exams",
    getAllExams: "/exams",
    getExamById: (id: string) => `/exams/${id}`,
    addExamWorkflow: (id: string) => `/exams/workflows/${id}`,
    getExamWorkflows: (id: string) => `/exams/workflows/${id}`,
  };

  constructor(private readonly api: API) {}

  async createExams(payload: CreateExamPayload) {
    const { data } = await this.api.instance.post(
      this.routes.createExams,
      payload
    );
    return CreateExamPayloadSchema.parse(data);
  }

  async getAllExams() {
    const { data } = await this.api.instance.get(this.routes.getAllExams);
    return GetExamResponse.array().parse(data);
  }

  async getExamByID(id: string) {
    const { data } = await this.api.instance.get(this.routes.getExamById(id));
    return GetExamResponse.parse(data);
  }

  async addExamWorkflow(id: string, payload: CreateExamWorkflowStagePayload) {
    const { data } = await this.api.instance.post(
      this.routes.addExamWorkflow(id),
      payload
    );

    return GetExamWorkflowStageResponse.parse(data);
  }

  async getExamWorkflows(id: string) {
    const { data } = await this.api.instance.get(
      this.routes.getExamWorkflows(id)
    );

    return GetExamWorkflowStageResponse.array().parse(data);
  }
}
