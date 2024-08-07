"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Job } from "@prisma/client";

interface SidebarProps {
  setJobs: (jobs: Job[]) => void;
  setLoading: (value: boolean) => void;
}

interface Filters {
  title: string;
  companyName: string;
  location: string;
  currency: string;
  salRange: [number, number];
}

const Sidebar = () => {

  const [filters, setFilters] = useState<Filters>({
    title: "",
    companyName: "",
    location: "",
    currency: "",
    salRange: [0, 1000000],
});

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
        ...filters,
        [e.target.name]: e.target.value,
    });
};

  const handleSliderChange = (value: [number, number]) => {
    setFilters({
        ...filters,
        salRange: value,
    });
};

  const fetchJobs = async () => {
    setLoading(true);
    //@ts-ignore
    const response = await getJobs(filters);
    if (response.status === "success") {
        //@ts-ignore
        setJobs(response.data);
    }
    setLoading(false);
};

useEffect(() => {
    fetchJobs();
}, [filters]);

  return (
    <div className="font-medium text-xs flex border flex-col items-center p-4 ">
            <span className="pl-4 text-2xl">
            Filter
            </span>
            <div className="gap-2">
            <Input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    onChange={handleFilterChange}
                    className="border p-2 rounded-md m-4 "
                />
                <Input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleFilterChange}
                    className="border p-2 rounded-md m-4"
                />
            </div>
        </div>
  );
};

export default Sidebar;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

