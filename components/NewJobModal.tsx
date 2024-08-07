"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import NewJobForm from "./forms/NewJobForm";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NewJobModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <h3 className="text-sm lg:text-3xl bg-gradient-to-r from-indigo-600 via-violet-500 to-blue-700 bg-clip-text text-transparent font-black hover:cursor-pointer ">
          Create Job
        </h3>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the Job details below</DialogTitle>
          <DialogDescription>
            This form contains all the job details that are required to post a
            job
          </DialogDescription>
        </DialogHeader>
        <NewJobForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default NewJobModal;
