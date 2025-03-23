import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { Workflow } from "@/components/ui/workflow";
import { ExtendedFC } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { LucidePlus, LucideWorkflow } from "lucide-react";

export const ExamWorkFlows: ExtendedFC<{ id: string }> = ({ id }) => {
  // const workflows: WorkflowStep[] = [
  //   {
  //     order: 1,
  //     content: "Before Exam",
  //     status: "completed",
  //   },
  //   {
  //     order: 2,
  //     content: "During Exam",
  //     status: "ongoing",
  //   },
  //   {
  //     order: 3,
  //     content: "After Exam",
  //     status: "pending",
  //   },
  // ];

  const workflows = useQuery({
    queryKey: [api.exams.routes.getExamWorkflows(id)],
    queryFn: async () => {
      const data = await api.exams.getExamWorkflows(id);
      return Promise.all(
        data.map(async (wf) => {
          const assignee = await api.users.getFacultyById(wf.assignee_id);
          return {
            ...wf,
            assignee,
          };
        })
      );
    },
    enabled: id.length > 0,
    initialData: [],
  });

  return (
    <section className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl flex gap-3">
          <LucideWorkflow className="translate-1" />
          WorkFlows
        </h1>
        {workflows.data.length > 0 && (
          <Button className="bg-cyan-700 hover:bg-cyan-900 text-white h-10 px-5! py-2 rounded-md">
            Add WorkFlow
          </Button>
        )}
      </div>
      {!workflows.data.length ? (
        <EmptyWorkFlows />
      ) : (
        <Workflow
          steps={workflows.data.map((wf) => ({
            order: wf.order,
            status: wf.status,
            content: wf.name,
          }))}
          newStep="New Workflow"
        />
      )}
    </section>
  );
};

export const EmptyWorkFlows: ExtendedFC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-h-screen min-h-[40vh]">
      <h1 className="text-2xl font-bold mb-2">No WorkFlows added yet</h1>
      <p className="text-sm text-gray-600 mb-4">
        Please click the button below to add a workflow.
      </p>
      <Button className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded">
        <LucidePlus />
        Add WorkFlow
      </Button>
    </div>
  );
};
