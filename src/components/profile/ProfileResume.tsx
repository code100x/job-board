'use client';
import { CirclePlus, FileText } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Form, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  profileResumeSchema,
  ProfileResumeType,
} from '@/lib/validators/user.profile.validator';
import { useToast } from '../ui/use-toast';

const ProfileResume = () => {
  const [file, setFiles] = useState<File | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles[0].size < 1048576 &&
        acceptedFiles[0].type.includes('pdf')
      ) {
        setFiles(acceptedFiles[0]);
      } else {
        toast({
          variant: 'destructive',
          title: 'Resume should be a pdf type and not more than 1 MB.',
        });
      }
    },
    [toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };
  const form = useForm<ProfileResumeType>({
    resolver: zodResolver(profileResumeSchema),
    defaultValues: {
      resume: '',
    },
  });

  // function onSubmit(values: ProfileResumeType) {
  //   console.log(values)
  // }
  function onSubmit() {}

  const handleFormClose = () => {
    form.reset();
    handleClose();
  };
  return (
    <>
      <h3 className="font-bold text-2xl">Resume</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <FileText width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t uploaded a resume yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Upload your resume to showcase your skills and experiences to
            recruiters.
          </p>
        </div>
        <Button className="text-white rounded-sm" onClick={handleOpen}>
          Upload your resume
        </Button>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0 w-[488px]">
          <SheetHeader>
            <SheetTitle className="text-2xl">Upload Your Resume</SheetTitle>
            <SheetDescription>
              Share your resume to give employers a full view of your
              qualifications and experiences.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div>
                  <FormLabel>Upload resume</FormLabel>
                  <div
                    {...getRootProps()}
                    className={`w-full h-44 flex justify-center items-center flex-col bg-slate-900 rounded-[8px] border border-transparent text-center mt-2 ${isDragActive && 'animate-pulse border-white'}`}
                  >
                    <input {...getInputProps()} />
                    {!file && (
                      <>
                        <CirclePlus height={24} width={24} />
                        <p className="font-medium text-base leading-6 block mt-2">
                          Drag and drop an image <br />
                          or click to upload
                        </p>
                        <p className="text-slate-400 text-xs">
                          Supported format : PDF <br />
                          Maximum file size: 1MB
                        </p>
                      </>
                    )}
                    {file && (
                      <>
                        <FileText height={24} width={24} />
                        <p className="font-medium text-base leading-6 block mt-2">
                          Selected File:
                        </p>
                        <p className="text-slate-400 text-xs">{file.name}</p>
                      </>
                    )}
                  </div>
                  <div></div>
                </div>
                <div className="py-4 flex gap-4 justify-end">
                  <Button
                    onClick={handleFormClose}
                    variant={'outline'}
                    className="mt-0 text-white rounded-[8px]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="mt-0 text-white rounded-[8px]"
                  >
                    Add Resume
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileResume;
