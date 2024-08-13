import { useState, ChangeEvent, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filters } from "@/app/(protected)/jobs/page";
import { debounce } from "@/lib/utils";
import { DEFAULT_SALARY_RANGE } from "@/constants/constants";

interface SidebarProps {
  filters: Filters;
  setFilters: (value: Filters) => void;
}

const formatSalary = (value: number, currency: string) => {
  let formattedValue = value / 1000;
  let unit = "k";

  if (currency === "INR" || currency === "") {
    return `${formattedValue} ${unit}`;
  } else if (currency === "USD") {
    return `$${formattedValue} ${unit}`;
  }
  return `${formattedValue} ${unit}`;
};

const Sidebar = ({ filters, setFilters }: SidebarProps) => {
  const [salaryRange, setSalaryRange] = useState([...DEFAULT_SALARY_RANGE]);
  const handleFilterChange = useCallback(debounce((e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  }), [filters]);

  const updateSalaryRange = useCallback(debounce((value) => {setFilters({
    ...filters,
    salRange: value,
  })}), [filters]);
  

  const handleSliderChange = (value: [number, number]) => {
    setSalaryRange(value);
    updateSalaryRange(value);
  };

  return (
    <aside className="p-4 min-w-48 border border-gray-200 rounded">
      <h2 className="mb-4">Job Filters</h2>
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />
        <Input
          type="text"
          name="companyName"
          placeholder="Company Name"
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />

        <Select
          onValueChange={(value) => {
            setFilters({
              ...filters,
              currency: value,
            });
          }}
        >
          <SelectTrigger className="max-w">
            <SelectValue placeholder="Choose currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="INR">₹ INR</SelectItem>
            <SelectItem value="USD">$ USD</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => {
            setFilters({
              ...filters,
              location: value,
            });
          }}
        >
          <SelectTrigger className="max-w">
            <SelectValue placeholder="Job Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="REMOTE">Remote</SelectItem>
            <SelectItem value="OFFICE">Office</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-col gap-2">
          <Slider
            defaultValue={[0, 1000000]}
            max={1000000}
            step={1000}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-sm">
            <span>
              Min: {formatSalary(salaryRange[0], filters.currency)}
            </span>
            <span>
              Max: {formatSalary(salaryRange[1], filters.currency)}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
