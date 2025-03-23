import Link from "next/link";
import { LucidePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtendedFC } from "@/types/react";

export const EmptyExamList: ExtendedFC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">No Upcoming Exams</h1>
      <p className="text-sm text-gray-600 mb-4">
        Please click the button below to schedule an exam.
      </p>
      <Link href="/dashboard/exams/new">
        <Button className="bg-cyan-700 hover:bg-cyan-900 text-white px-4 py-2 rounded">
          <LucidePlus />
          Schedule Exam
        </Button>
      </Link>
    </div>
  );
};
