import type { API } from ".";
import { LoginPayload, LoginResponseSchema } from "@/validators/auth";

export class AuthAPI {
  constructor(private readonly api: API) {}

  async registerFaculty() {
    const data = await this.api.instance.post("/auth/register/faculty");
    return data;
  }

  async loginFaculty(payload: LoginPayload) {
    const { data } = await this.api.instance.post(
      "/auth/login/faculty",
      payload
    );

    return LoginResponseSchema.parse(data);
  }
}
