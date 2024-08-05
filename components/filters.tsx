import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-background rounded-lg shadow p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Accordion type="single" collapsible>
          <AccordionItem value="job-type">
            <AccordionTrigger className="text-base">Job Type</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="job-type-full-time" /> Full-Time
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="job-type-part-time" /> Part-Time
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="job-type-contract" /> Contract
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="job-type-internship" /> Internship
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="salary-range">
            <AccordionTrigger className="text-base">
              Salary Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="salary-range-0-50k" /> $0 - $50,000
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="salary-range-50k-100k" /> $50,000 - $100,000
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="salary-range-100k-150k" /> $100,000 - $150,000
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="salary-range-150k-plus" /> $150,000+
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="experience-level">
            <AccordionTrigger className="text-base">
              Experience Level
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="experience-level-entry" /> Entry Level
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="experience-level-mid" /> Mid Level
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="experience-level-senior" /> Senior Level
                </Label>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sort By</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Newest</span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-full">
            <DropdownMenuRadioGroup value="newest">
              <DropdownMenuRadioItem value="newest">
                Newest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="oldest">
                Oldest
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="salary-asc">
                Salary: Low to High
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="salary-desc">
                Salary: High to Low
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
