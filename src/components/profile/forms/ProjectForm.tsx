import React, { useCallback, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  profileProjectSchema,
  ProfileProjectType,
} from '@/lib/validators/user.profile.validator';
import { CirclePlus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { addUserProjects, editProject } from '@/actions/user.profile.actions';
import { submitImage } from '@/lib/utils';
import { ProjectType } from '@/types/user.types';

const ProjectForm = ({
  handleClose,
  selectedProject,
}: {
  handleClose: () => void;
  selectedProject: ProjectType | null;
}) => {
  const [file, setFiles] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<null | string>(
    selectedProject?.projectThumbnail || null
  );

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

  const form = useForm<ProfileProjectType>({
    resolver: zodResolver(profileProjectSchema),
    defaultValues: {
      projectThumbnail: selectedProject?.projectThumbnail || './main.svg',
      projectSummary: selectedProject?.projectSummary || '',
      isFeature: selectedProject?.isFeature || false,
      projectGithub: selectedProject?.projectGithub || '',
      projectLiveLink: selectedProject?.projectLiveLink || '',
      projectName: selectedProject?.projectName || '',
    },
  });

  // function onSubmit(values: ProfileProjectType) {
  //   console.log(values)
  // }
  async function onSubmit(data: ProfileProjectType) {
    try {
      if (file) {
        data.projectThumbnail = await submitImage(file);
      }
      let response;
      if (selectedProject?.id) {
        response = await editProject({ data: data, id: selectedProject?.id });
      } else {
        response = await addUserProjects(data);
      }

      if (!response.status) {
        return toast({
          title: response.message || 'Error',
          variant: 'destructive',
        });
      }
      toast({
        title: response.message,
        variant: 'success',
      });

      handleFormClose();
    } catch (_error) {
      toast({
        title: 'Something went wrong while Adding Skills',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  }

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    handleClose();
    handleImageReset();
  };
  const handleImageReset = () => {
    setFiles(null);
    setPreviewImg(null);
  };

  return (
    <div className=" flex-1 relative">
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
                className={`w-full overflow-hidden h-44 flex justify-center items-center flex-col bg-slate-100 dark:bg-slate-900 rounded-[8px] border border-transparent text-center mt-2 relative ${isDragActive && 'animate-pulse border-white'}`}
              >
                {previewImg && (
                  <div
                    onClick={handleImageReset}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center cursor-pointer"
                  >
                    <X height={16} width={16} />
                  </div>
                )}
                {!file && !previewImg && (
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
                {previewImg && (
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
              name="stack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Stack</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) =>
                        form.setValue(
                          'stack',
                          value as
                            | 'GO'
                            | 'PYTHON'
                            | 'MERN'
                            | 'NEXTJS'
                            | 'AI_GPT_APIS'
                            | 'SPRINGBOOT'
                            | 'OTHERS'
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Others" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="GO">Go</SelectItem>
                        <SelectItem value="PYTHON">Python</SelectItem>
                        <SelectItem value="MERN">MERN</SelectItem>
                        <SelectItem value="NEXTJS">NextJS</SelectItem>
                        <SelectItem value="AI_GPT_APIS">AI/GPT APIs</SelectItem>
                        <SelectItem value="SPRINGBOOT">Springboot</SelectItem>
                        <SelectItem value="OTHERS">Others</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="projectSummary"
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
            <FormField
              control={form.control}
              name="isFeature"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel> Feature this project. </FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="py-4 flex gap-4 justify-end">
            <Button
              onClick={handleFormClose}
              variant={'outline'}
              className="mt-0 text-slate-500 dark:text-white rounded-[8px]"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="mt-0 text-white rounded-[8px]"
            >
              {form.formState.isSubmitting
                ? 'Please wait ...'
                : selectedProject?.id
                  ? 'Update Project'
                  : 'Add Project'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
