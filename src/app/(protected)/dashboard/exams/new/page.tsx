"use client";

import { api } from "@/api";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectBox } from "@/components/ui/select";
import { useStaticData } from "@/hooks/static";
import { ExtendedFC } from "@/types/react";
import { CreateExamPayload } from "@/validators/exams";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateExam: ExtendedFC = () => {
  const { departments, examTypes, subjects } = useStaticData();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [examTypeId, setExamTypeId] = useState<string | undefined>(undefined);
  const [departmentId, setDepartmentId] = useState<string | undefined>(
    undefined
  );
  const [subjectId, setSubjectId] = useState<string | undefined>(undefined);
  const [fullMarks, setFullMarks] = useState<number | undefined>(undefined);
  const [passingMarks, setPassingMarks] = useState<number | undefined>(
    undefined
  );

  const handleNumberInput =
    (setter: (value?: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value = parseInt(e.target.value, 10);
      if (!Number.isNaN(value)) {
        setter(value);
      } else {
        setter(undefined);
      }
    };

  const createExam = useMutation({
    mutationFn: (payload: CreateExamPayload) => api.exams.createExams(payload),
    onMutate: async () => {
      await queryClient.invalidateQueries({
        queryKey: [api.exams.routes.getAllExams],
      });
      router.push("/dashboard/exams");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!examTypeId || !departmentId || !subjectId || !date) {
      return;
    }

    createExam.mutate({
      exam_id: examTypeId,
      department_id: departmentId,
      subject_id: subjectId,
      exam_date: date.toISOString(),
      session: new Date(date).getFullYear(),
      total_marks: !!fullMarks ? fullMarks : undefined,
      passing_marks: !!passingMarks ? passingMarks : undefined,
    });
  };

  return (
    <section className="p-5">
      <form
        onSubmit={handleSubmit}
        className="border rounded w-fit min-w-[520px] min-h-56"
      >
        <div className="p-4">
          <h1 className="text-2xl mb-4">Create Exam</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label aria-required htmlFor="exam_type">
                Exam Name
              </Label>
              <SelectBox
                value={examTypeId}
                onChange={setExamTypeId}
                placeholder="Select Exam Name"
                className="w-full min-h-12 px-5 border rounded"
                items={(examTypes.data ?? []).map((examType) => ({
                  label: examType.name,
                  value: examType.id,
                }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label aria-required htmlFor="department">
                Department
              </Label>
              <SelectBox
                value={departmentId}
                onChange={setDepartmentId}
                placeholder="Select Department"
                className="w-full min-h-12 px-5 border rounded"
                items={(departments.data ?? []).map((dept) => ({
                  label: dept.name,
                  value: dept.id,
                }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label aria-required htmlFor="subject">
                Subject
              </Label>
              <SelectBox
                value={subjectId}
                onChange={setSubjectId}
                placeholder="Select Subject"
                className="w-full min-h-12 px-5 border rounded"
                items={(subjects.data ?? []).map((sub) => ({
                  label: sub.name,
                  value: sub.id,
                }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label aria-required htmlFor="date-picker">
                Date
              </Label>
              <DatePicker
                date={date}
                setDate={setDate}
                className="w-full h-12"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="full-marks">Full Marks</Label>
              <Input
                value={fullMarks ?? 0}
                onChange={handleNumberInput(setFullMarks)}
                className="w-full h-12"
                placeholder="Enter full marks in whole numbers"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="passing-marks">Passing Marks</Label>
              <Input
                value={passingMarks ?? 0}
                onChange={handleNumberInput(setPassingMarks)}
                className="w-full h-12"
                placeholder="Enter passing marks in whole numbers"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-end">
            <Button
              type="button"
              onClick={() => router.push("/dashboard/exams")}
              className="bg-gray-50 hover:bg-gray-100 border border-cyan-600 min-w-28 text-cyan-800 h-12 px-5! py-2 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-cyan-700 min-w-28 hover:bg-cyan-900 text-white h-12 px-5! py-2 rounded-md"
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateExam;
