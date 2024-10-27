import React, { useRef, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { uploadFileAction } from '@/actions/upload-to-cdn';
import { addUserResume } from '@/actions/user.profile.actions';
import { LoadingSpinner } from '../loading-spinner';

export const AddResume = () => {
  const resumeFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (resumeFileRef.current) {
      resumeFileRef.current.click();
    }
  };

  const clearResumeFile = () => {
    if (resumeFileRef.current) {
      resumeFileRef.current.value = '';
    }
    setFileName(null);
    setFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const { toast } = useToast();

  const onSubmit = async () => {
    if (!file) {
      return toast({
        title: 'Please Select a File',
        variant: 'destructive',
      });
    }

    if (file?.size > 10485760) {
      return toast({
        title: 'File Size Exceeded',
        description: 'File Size should be less than 10 MB',
        variant: 'destructive',
      });
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append('uniqueFileName', uniqueFileName);

      const res = await uploadFileAction(formData, 'pdf');
      if (!res) {
        return toast({
          title: 'Internal Server Error',
          description: 'Please try again later.',
          variant: 'destructive',
        });
      }
      if (res.error) {
        return toast({
          title: 'Upload Failed',
          description: `Error: ${res.error}`,
          variant: 'destructive',
        });
      }
      if (res.message) {
        const response = await addUserResume(res.url);
        if (!response.status) {
          return toast({
            title: response.message || 'Error',
            variant: 'destructive',
          });
        }
        return toast({
          title: response.message,
          variant: 'success',
        });
      }
    } catch (_error) {
      return toast({
        title: 'Upload Error',
        description:
          'An error occurred while uploading the file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <div
          className="w-64 h-32 bg-gray-700 border border-dashed border-gray-500 rounded-md flex flex-col items-center justify-center cursor-pointer mb-2"
          onClick={handleClick}
        >
          {fileName ? (
            <div className="text-white text-center">
              <FaFileUpload className="mx-auto text-3xl mb-2" />
              <p className="text-sm">{fileName}</p>
            </div>
          ) : (
            <div className="text-white text-center">
              <FaFileUpload className="mx-auto text-3xl mb-2" />
              <p className="text-sm">Click to upload resume</p>
            </div>
          )}
        </div>
        {fileName && (
          <button
            type="button"
            onClick={clearResumeFile}
            className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center cursor-pointer translate-x-1/2 -translate-y-1/2"
            aria-label="x"
          >
            <X size="16" />
          </button>
        )}
      </div>
      <input
        ref={resumeFileRef}
        id="fileInput"
        className="hidden"
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
      />
      <p className="text-sm text-gray-500 text-center mt-2">
        Allowed file types: PDF, DOC, DOCX
      </p>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Button className="mt-4 w-full" onClick={onSubmit} aria-label="submit">
          Submit
        </Button>
      )}
    </div>
  );
};
