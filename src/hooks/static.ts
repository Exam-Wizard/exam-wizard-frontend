import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useStaticData = () => {
  const departments = useQuery({
    queryKey: [api.static.routes.getDepartments],
    queryFn: () => api.static.getDepartments(),
    staleTime: Infinity,
  });

  const subjects = useQuery({
    queryKey: [api.static.routes.getSubjects],
    queryFn: () => api.static.getSubjects(),
    staleTime: Infinity,
  });

  const examTypes = useQuery({
    queryKey: [api.static.routes.getExamDefinitions],
    queryFn: () => api.static.getExamDefinitions(),
    staleTime: Infinity,
  });

  return { departments, subjects, examTypes };
};
