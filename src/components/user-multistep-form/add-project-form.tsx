import {
  projectSchema,
  projectSchemaType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { addUserProjects } from '@/actions/user.profile.actions';
import { useRef, useState } from 'react';
import { LoadingSpinner } from '../loading-spinner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { FaFileUpload } from 'react-icons/fa';
import Image from 'next/image';
import { X } from 'lucide-react';

export const AddProject = () => {
  const form = useForm<projectSchemaType>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectThumbnail: '',
      projectName: '',
      projectSummary: '',
      projectGithub: '',
      projectLiveLink: '',
      stack: 'OTHERS',
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const projectThumbnail = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput) {
      fileInput.click();
    }
  };
  const clearImage = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;

    if (fileInput) {
      fileInput.value = '';
    }
    setPreviewImg(null);
    setFile(null);
  };

  const submitImage = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData, 'webp');
      if (!res) {
        throw new Error('Failed to upload image');
      }

      const uploadRes = res;
      return uploadRes.url;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (!selectedFile) {
      return;
    }
    if (!selectedFile.type.includes('image')) {
      toast({
        title:
          'Invalid file format. Please upload an image file (e.g., .png, .jpg, .jpeg, .svg ) for the company logo',
        variant: 'destructive',
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (projectThumbnail.current) {
        projectThumbnail.current.src = reader.result as string;
      }
      setPreviewImg(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: projectSchemaType) => {
    try {
      setIsLoading(true);
      data.projectThumbnail = (await submitImage(file)) ?? '';
      const response = await addUserProjects(data);
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
      setPreviewImg(null);
      form.reset(form.formState.defaultValues);
    } catch (_error) {
      toast({
        title: 'Something went wrong while Adding Projects',
        description: 'Internal server error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="projectThumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Thumbnail</FormLabel>
              <FormControl>
                <Input
                  id="fileInput"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  {...field}
                  onChange={handleFileChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="relative">
          <div
            className="w-full h-20 dark:bg-gray-700 bg-gray-300 border border-dashed border-gray-500 rounded-md flex items-center justify-center cursor-pointer mt-4"
            onClick={handleClick}
          >
            {previewImg ? (
              <Image
                src={previewImg}
                ref={projectThumbnail}
                className="object-contain w-full h-full"
                alt="Company Logo"
                width={200}
                height={150}
              />
            ) : (
              <FaFileUpload className="text-white text-2xl" />
            )}
          </div>
          {previewImg && (
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full items-center flex justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
            >
              <X size="16" />
            </button>
          )}
        </div>
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectGithub"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Github Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectLiveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Live Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectSummary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Summary</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
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

        {isLoading ? (
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        ) : (
          <Button type="submit" className="mt-4">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};
