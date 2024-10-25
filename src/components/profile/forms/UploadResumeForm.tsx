import { useToast } from '@/components/ui/use-toast';
import {
  profileResumeSchema,
  ProfileResumeType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { Form, FormLabel } from '@/components/ui/form';
import { CirclePlus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addUserResume } from '@/actions/user.profile.actions';
import { uploadFileAction } from '@/actions/upload-to-cdn';

const UploadResumeForm = ({ handleClose }: { handleClose: () => void }) => {
  const [file, setFiles] = useState<File | null>(null);

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

  const form = useForm<ProfileResumeType>({
    resolver: zodResolver(profileResumeSchema),
    defaultValues: {
      resume: '/main.svg',
    },
  });
  const submitFile = async (file: File | null) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData, 'pdf');
      if (!res) {
        throw new Error('Failed to upload resume');
      }

      const uploadRes = res;
      return uploadRes.url;
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  async function onSubmit(data: ProfileResumeType) {
    try {
      data.resume = (await submitFile(file)) ?? '/main.svg';
      const response = await addUserResume(data.resume);

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
        title: 'Something went wrong will creating HR',
        description: 'Internal server error',
        variant: 'destructive',
      });
    }
  }

  const handleFormClose = () => {
    form.reset();
    handleClose();
  };
  return (
    <div className=" flex-1 relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-full flex flex-col justify-between"
        >
          <div>
            <FormLabel>Upload resume</FormLabel>
            <div
              {...getRootProps()}
              className={`w-full h-44 flex justify-center items-center flex-col bg-slate-100 dark:bg-slate-900 rounded-[8px] border border-transparent text-center mt-2 ${isDragActive && 'animate-pulse border-white'}`}
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
              {form.formState.isSubmitting ? 'Please wait ...' : 'Add Resume'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadResumeForm;
