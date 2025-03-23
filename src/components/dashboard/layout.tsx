import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "./header";

const navItems = [
  { name: "Exams", href: "/dashboard/exams" },
  { name: "Roles", href: "/dashboard/roles" },
  { name: "Faculty", href: "/dashboard/faculty" },
];

export function Dashboard({ children }: React.PropsWithChildren) {
  return (
    <div className="flex justify-between h-screen w-full overflow-hidden bg-background">
      <div className="w-1/5 min-w-[200px] border-r">
        <div className="m-4 w-48 h-20 relative">
          <Image
            src="/banner.png"
            alt="Logo"
            className="absolute object-contain"
            fill
          />
        </div>
        <div>
          <div className="p-4 gap-2 flex flex-col">
            {navItems.map((item) => (
              <Link
                className={cn("p-4 rounded-md hover:bg-slate-100", {
                  "bg-slate-200 hover:bg-slate-200":
                    item.href === "/dashboard/exams",
                })}
                key={item.name}
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-4/5 flex-col">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
