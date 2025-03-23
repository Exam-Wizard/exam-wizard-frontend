import axios, { Axios } from "axios";
import { redirect } from "next/navigation";
import { AuthAPI } from "./auth";
import { StaticAPI } from "./static";
import { ExamsAPI } from "./exams";
import { UsersAPI } from "./user";
import { getTokens } from "@/hooks/auth";
import { env } from "@/lib/config";

export class API {
  public instance: Axios;
  public auth: AuthAPI;
  public exams: ExamsAPI;
  public static: StaticAPI;
  public users: UsersAPI;

  constructor() {
    this.instance = this.createInstance(env.NEXT_PUBLIC_API_URL);
    this.auth = new AuthAPI(this);
    this.exams = new ExamsAPI(this);
    this.static = new StaticAPI(this);
    this.users = new UsersAPI(this);
  }

  createInstance(baseURL: string) {
    const instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      adapter: "fetch",
      fetchOptions: { cache: "no-cache" },
    });

    instance.interceptors.request.use(
      (config) => {
        const accessToken = getTokens()?.access_token;

        if (accessToken && accessToken.length > 0) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // TODO: check error specifically for token_expiration error
    instance.interceptors.response.use(
      ({ data }) => data,
      (error) => {
        if (
          error.config.method?.toLowerCase() !== "get" &&
          !window.location.href.startsWith("/auth")
        ) {
          return Promise.reject(error);
        }
        if (error.response?.status === 401) {
          localStorage.removeItem("tokens");
          if (typeof window !== "undefined")
            window.location.href = "/auth/login";
          else redirect("/auth/login");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }
}

export const api = new API();
