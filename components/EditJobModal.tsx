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
import { useState } from "react";
import EditJobForm from "./forms/EditJobForm";


type EditModalProp ={
  id: string;
}

export const EditJobModal = ({id}:EditModalProp) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <Button variant={"outline"} size={"sm"}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the Job details </DialogTitle>
          <DialogDescription>
            This form contains all the job details that are required to post a
            job
          </DialogDescription>
        </DialogHeader>
        <EditJobForm id={id} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

