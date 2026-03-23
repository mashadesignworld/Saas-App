"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [subject, setSubject] = useState("all");

  useEffect(() => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "subject",
      value: subject,
    });

    router.push(`${pathname}?${newUrl}`, { scroll: false });
  }, [subject, router, pathname]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>

        {subjects.map((subj) => (
          <SelectItem key={subj} value={subj} className="capitalize">
            {subj}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;