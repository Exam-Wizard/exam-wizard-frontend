"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { LucidePlus, LucideUniversity } from "lucide-react";
import { format } from "date-fns";

import { EmptyExamList } from "./empty";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/api";
import { useStaticData } from "@/hooks/static";
import { daysLeft, findByID } from "@/lib/utils";
import { ExtendedFC } from "@/types/react";

export const ExamList: ExtendedFC = () => {
  const { examTypes, departments, subjects } = useStaticData();

  const exams = useQuery({
    queryKey: [api.exams.routes.getAllExams],
    queryFn: () => api.exams.getAllExams(),
  });

  if (exams.isLoading || !exams.data?.length) {
    return <EmptyExamList />;
  }

  return (
    <div className="p-5 flex flex-wrap gap-5">
      <div className="h-16 w-full flex justify-between">
        <Input
          type="search"
          placeholder="Search by exam name"
          className="w-[440px] h-12 px-5"
        />
        <Link href="/dashboard/exams/new">
          <Button className="bg-cyan-700 hover:bg-cyan-900 text-white h-12 px-5! py-2 rounded-md">
            <LucidePlus className="stroke-3" />
            Schedule Exam
          </Button>
        </Link>
      </div>
      {exams.data.map((exam) => (
        <Link key={exam.id} href={`/dashboard/exams/${exam.id}`}>
          <div
            key={exam.id}
            className="border rounded w-[440px] min-h-56 p-4 flex flex-col gap-1"
          >
            <h1 className="text-2xl">
              {findByID(examTypes.data, exam.exam_id)?.name}{" "}
              <span className="text-lg">({exam.session})</span>
            </h1>
            <h3 className="flex gap-1 text-gray-700">
              <LucideUniversity className="scale-90 -translate-y-0.5 text-gray-700 stroke-2" />
              {findByID(departments.data, exam.department_id)?.name}
            </h3>
            <div className="mt-4 p-2 border-t flex flex-col gap-2">
              <h3>
                <span className="text-gray-700">Subject: </span>
                {findByID(subjects.data, exam.subject_id)?.name}
              </h3>
              <h3>
                <span className="text-gray-700">Date: </span>
                {format(exam.exam_date, "PPP")}
                <span className="text-gray-500 block">
                  {daysLeft(exam.exam_date)} days left
                </span>
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
