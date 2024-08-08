import { useState, useCallback, useEffect, ChangeEvent } from "react";
import { getJobs } from "@/actions/job";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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

const formatSalary = (value: number, currency: string) => {
    // ... (unchanged)
};

const Sidebar = ({ setJobs, setLoading }: SidebarProps) => {
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

    const fetchJobs = useCallback(async () => {
        setLoading(true);
        //@ts-ignore
        const response = await getJobs(filters);
        if (response.status === "success") {
            //@ts-ignore
            setJobs(response.data);
        }
        setLoading(false);
    }, [filters, setJobs, setLoading]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            fetchJobs();
        }, 300); // 300ms debounce delay

        return () => clearTimeout(debounceTimer);
    }, [fetchJobs]);

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
                    <SelectTrigger className="w-[180px]">
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
                    <SelectTrigger className="w-[180px]">
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
                        defaultValue={filters.salRange}
                        max={1000000}
                        step={1000}
                        onValueChange={handleSliderChange}
                        value={filters.salRange}
                    />
                    <div className="flex justify-between">
                        <span>Min: {formatSalary(filters.salRange[0], filters.currency)}</span>
                        <span>Max: {formatSalary(filters.salRange[1], filters.currency)}</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;