import type { API } from ".";
import {
  DepartmentSchema,
  ExamDefinitionSchema,
  SubjectSchema,
} from "@/validators/static";

export class StaticAPI {
  public routes = {
    getDepartments: "/static/departments",
    getSubjects: "/static/subjects",
    getExamDefinitions: "/static/exam-types",
  };

  constructor(private readonly api: API) {}

  async getDepartments() {
    const { data } = await this.api.instance.get(this.routes.getDepartments);
    return DepartmentSchema.array().parse(data);
  }

  async getSubjects() {
    const { data } = await this.api.instance.get(this.routes.getSubjects);
    return SubjectSchema.array().parse(data);
  }

  async getExamDefinitions() {
    const { data } = await this.api.instance.get(
      this.routes.getExamDefinitions
    );
    return ExamDefinitionSchema.array().parse(data);
  }
}
