"use client"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { useState } from "react";
import CustomJobsForm from "./forms/CustomJobForm";


const NewJobModal = () => {

  const [open, setOpen] = useState(false);

 
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Job</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter the Job details below</DialogTitle>
          <DialogDescription>Choose your job type and fill the form</DialogDescription>
        </DialogHeader>
         <Tabs defaultValue="regular">
          <TabsList className="flex ">
            <TabsTrigger value="regular" className="flex-1 text-base font-semibold rounded-md border-2 border-b-black shadow-lg justify-center items-center data-[state=active]:border-indigo-700">
              Regular
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1 text-base font-semibold   rounded-md border-2 border-b-black shadow-lg justify-center items-center data-[state=active]:border-indigo-700">
              Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regular" ><NewJobForm setOpen={setOpen} /></TabsContent>
          <TabsContent value="custom"><CustomJobsForm setOpen={setOpen} /></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewJobModal;
