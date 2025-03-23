import type { API } from ".";
import { FacultySchema } from "@/validators/auth";

export class UsersAPI {
  public routes = {
    getAllFaculties: "/users/faculty",
    getFacultyById: (id: string) => `/users/faculty/${id}`,
  };

  constructor(private readonly api: API) {}

  async getAllFaculties() {
    const { data } = await this.api.instance.get(this.routes.getAllFaculties);
    return FacultySchema.array().parse(data);
  }

  async getFacultyById(id: string) {
    const { data } = await this.api.instance.get(
      this.routes.getFacultyById(id)
    );
    return FacultySchema.parse(data);
  }
}
