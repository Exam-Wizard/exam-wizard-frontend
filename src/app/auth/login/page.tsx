import { Login } from "@/components/auth/login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
