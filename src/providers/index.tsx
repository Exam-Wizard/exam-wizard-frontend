import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AuthProvider } from "./auth";
import { ReactQueryProvider } from "./react-query";
import { ExtendedFC } from "@/types/react";

export const Providers: ExtendedFC = ({ children }) => {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ReactQueryProvider>
    </AuthProvider>
  );
};
