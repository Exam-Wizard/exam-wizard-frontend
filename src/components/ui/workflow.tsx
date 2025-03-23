import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface WorkflowStep {
  order: number;
  content: React.ReactNode;
  status: "pending" | "ongoing" | "completed";
}

export interface WorkflowProps {
  steps: WorkflowStep[];
  className?: string;
  newStep?: WorkflowStep["content"];
}

export function Workflow({ steps, className, newStep = null }: WorkflowProps) {
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>(steps);

  useEffect(() => {
    if (newStep) {
      const newStepOrder = workflowSteps.length + 1;
      setWorkflowSteps([
        ...workflowSteps,
        {
          order: newStepOrder,
          content: newStep,
          status: "pending",
        },
      ]);
    } else {
      setWorkflowSteps(steps);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newStep]);

  return (
    <div className={cn("flex flex-col space-y-0", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <div key={step.order} className="flex">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                  {
                    "border-primary bg-primary text-primary-foreground":
                      step.status === "completed",
                    "border-primary bg-background text-primary":
                      step.status === "ongoing",
                    "border-muted-foreground bg-background text-muted-foreground":
                      step.status === "pending",
                  }
                )}
              >
                {step.order}
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "h-12 w-0.5",
                    step.status === "completed"
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>

            {step.content}
          </div>
        );
      })}
    </div>
  );
}
