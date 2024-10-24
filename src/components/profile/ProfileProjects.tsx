'use client';
import { CirclePlus, Info, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import {
  ProfileProjectType,
  profileProjectSchema,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import Image from 'next/image';

const ProfileProjects = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [file, setFiles] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<null | string>(null);

  const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (
        acceptedFiles[0].size < 1024 * 1024 * 5 &&
        acceptedFiles[0].type.includes('image')
      ) {
        setFiles(acceptedFiles[0]);
        setPreviewImg(URL.createObjectURL(acceptedFiles[0]));
      } else {
        toast({
          variant: 'destructive',
          title: 'Project thumbnail should be a image and not more than 5 MB.',
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
  const form = useForm<ProfileProjectType>({
    resolver: zodResolver(profileProjectSchema),
    defaultValues: {
      projectThumbnail: '',
      projectDescription: '',
      projectFeatured: false,
      projectGithub: '',
      projectLiveLink: '',
      projectName: '',
    },
  });

  // function onSubmit(values: ProfileProjectType) {
  //   console.log(values)
  // }
  function onSubmit() {}

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
    setFiles(null);
  };
  const handleImageReset = () => {
    setFiles(null);
    setPreviewImg(null);
  };
  return (
    <>
      <h3 className="font-bold text-2xl">Projects</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <Info width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t added any projects yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Showcase your projects to demonstrate your skills and expertise.
          </p>
        </div>
        <Button className="text-white rounded-sm" onClick={handleOpen}>
          Add your projects
        </Button>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add New Project</SheetTitle>
            <SheetDescription>
              Highlight key project that demonstrate your technical abilities
              and innovative problem-solving.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div className=" flex flex-col gap-y-4">
                  <div>
                    <FormLabel>Upload project thumbnail</FormLabel>
                    <div
                      {...getRootProps()}
                      className={`w-full overflow-hidden h-44 flex justify-center items-center flex-col bg-slate-900 rounded-[8px] border border-transparent text-center mt-2 relative ${isDragActive && 'animate-pulse border-white'}`}
                    >
                      {file && previewImg && (
                        <div
                          onClick={handleImageReset}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center cursor-pointer"
                        >
                          {' '}
                          <X height={16} width={16} />{' '}
                        </div>
                      )}
                      {!file && (
                        <>
                          <input {...getInputProps({ accept: 'images' })} />
                          <CirclePlus height={24} width={24} />
                          <p className="font-medium text-base leading-6 block mt-2">
                            Drag and drop an image <br />
                            or click to upload
                          </p>
                          <p className="text-slate-400 text-xs">
                            Supported formats: JPEG, PNG. <br />
                            Maximum file size: 5MB
                          </p>
                        </>
                      )}
                      {file && previewImg && (
                        <Image
                          src={previewImg}
                          alt="project-image"
                          width={300}
                          height={300}
                          className="object-cover !w-full !h-full "
                        />
                      )}
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Project Name </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter project name" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectLiveLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Live Link </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Live Link" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectGithub"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Github Link </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Github Link" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Project Description </FormLabel>
                        <FormControl>
                          <Textarea placeholder="Write here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Describe your project between 50 to 255 characters.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-4 flex gap-4 justify-end">
                  <Button
                    type="reset"
                    onClick={handleFormClose}
                    variant={'outline'}
                    className="mt-0 text-white rounded-[8px]"
                  >
                    {' '}
                    Cancel{' '}
                  </Button>
                  <Button
                    type="submit"
                    className="mt-0 text-white rounded-[8px]"
                  >
                    {' '}
                    Add Project{' '}
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

export default ProfileProjects;
