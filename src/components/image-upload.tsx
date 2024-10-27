import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Upload } from 'lucide-react';

export default function ImageUpload() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormItem>
      <FormLabel>Company Logo</FormLabel>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          {logoPreview ? (
            <div className="relative w-full h-full">
              <Image
                src={logoPreview}
                alt="Company Logo Preview"
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
          )}
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleLogoChange}
            accept="image/*"
          />
        </label>
      </div>
      {logoPreview && (
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => setLogoPreview(null)}
        >
          Remove Image
        </Button>
      )}
      <FormMessage />
    </FormItem>
  );
}
