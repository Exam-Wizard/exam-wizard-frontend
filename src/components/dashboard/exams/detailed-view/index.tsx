"use client";

import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { useStaticData } from "@/hooks/static";
import { daysLeft, findByID } from "@/lib/utils";
import { ExtendedFC } from "@/types/react";
import { Subject } from "@/validators/static";
import { useQuery } from "@tanstack/react-query";
import {
  LucideAlarmClock,
  LucideBadgePercent,
  LucideBookA,
  LucideExternalLink,
} from "lucide-react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { Nullish } from "@/types";
import { ExamWorkFlows } from "./workflows";

export const ExamDetails: ExtendedFC = () => {
  const { id } = useParams<{ id: string }>();
  const { examTypes, departments, subjects } = useStaticData();
  const exam = useQuery({
    queryKey: [api.exams.routes.getExamById(id)],
    queryFn: () => api.exams.getExamByID(id),
    enabled: id.length > 0,
  });

  if (exam.isLoading || !exam.data) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <section className="p-5">
      <h1 className="text-4xl">
        {findByID(examTypes.data, exam.data.exam_id)?.name}{" "}
        <span className="text-2xl">({exam.data.session})</span>
      </h1>
      <div className="flex items-end rounded-full py-2 w-fit flex-col gap-3 mt-5">
        <h3 className="flex gap-3 text-xl text-gray-700">
          <span className="font-bold">
            {findByID(departments.data, exam.data.department_id)?.name}
          </span>
          <Button className="p-0! size-5 bg-transparent hover:bg-transparent">
            <LucideExternalLink className="size-full text-blue-400" />
          </Button>
        </h3>
      </div>
      <div className="mt-5 flex border-b pb-5 flex-wrap gap-5">
        <SubjectDetails
          subject={findByID(subjects.data, exam.data.subject_id)}
        />
        <ExamDate date={new Date(exam.data.exam_date)} />
        <Marks
          total={exam.data.total_marks}
          passing={exam.data.passing_marks}
        />
      </div>
      <ExamWorkFlows id={exam.data.id} />
    </section>
  );
};

const SubjectDetails: ExtendedFC<{ subject?: Subject }> = ({ subject }) => {
  if (!subject) return null;

  return (
    <div className="p-3 flex items-center gap-3 border rounded-md shadow bg-gray-100 w-fit min-w-56 text-nowrap">
      <LucideBookA className="stroke-1 size-10" />
      <div>
        <h1 className="text-lg">{subject.name}</h1>
        <p className="text-sm text-gray-600">
          Paper Code: <span className="text-black">{subject.code}</span>
        </p>
      </div>
    </div>
  );
};

const ExamDate: ExtendedFC<{ date: Date }> = ({ date }) => {
  return (
    <div className="p-3 flex items-center gap-3 border rounded-md shadow bg-gray-100 w-fit min-w-56 text-nowrap">
      <LucideAlarmClock className="stroke-1 size-10" />
      <div>
        <h1 className="text-lg">{format(date, "PPP")}</h1>
        <p className="text-sm text-gray-600">
          <span className="text-black">{daysLeft(date.toISOString())} </span>
          days remaining
        </p>
      </div>
    </div>
  );
};

const Marks: ExtendedFC<{
  total: Nullish<number>;
  passing: Nullish<number>;
}> = ({ total, passing }) => {
  if (!total || !passing) return null;
  return (
    <div className="p-3 flex items-center gap-3 border rounded-md shadow bg-gray-100 w-fit min-w-56 text-nowrap">
      <LucideBadgePercent className="stroke-1 size-10" />
      <div>
        <h1 className="text-lg">
          <span className="text-base text-gray-600">TOTAL:</span> {total}{" "}
          <span className="text-base text-gray-600">REQUIRED:</span> {passing}
        </h1>
        <p className="text-sm text-gray-600">
          <span className="text-black">
            {Math.round((passing * 100) / total)}%
          </span>{" "}
          required to pass
        </p>
      </div>
    </div>
  );
};
