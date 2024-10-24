'use client';
import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useForm } from 'react-hook-form';
import {
  aboutMeSchema,
  AboutMeSchemaType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';

const ProfileAboutMe = () => {
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };
  const handleOpen = () => {
    setIsSheetOpen(true);
  };
  const form = useForm<AboutMeSchemaType>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      aboutMe: '',
    },
  });

  // function onSubmit(values: AboutMeSchemaType) {
  //   console.log(values)
  // }
  function onSubmit() {}

  const handleFormClose = () => {
    form.reset();
    handleClose();
  };

  return (
    <>
      <h3 className="font-bold text-2xl">About Me</h3>
      <div className="border rounded-2xl  h-80 overflow-hidden flex flex-col gap-y-4 px-6 items-center justify-center">
        <FileText width={32} height={32} />
        <div className="text-center">
          <h4 className="font-bold text-xl">
            You haven’t added an about me yet
          </h4>
          <p className="text-sm font-medium text-gray-500">
            Share a brief introduction to let companies know who you are.
          </p>
        </div>
        <Button onClick={handleOpen} className="text-white rounded-sm">
          Add About Me
        </Button>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={handleClose}>
        <SheetContent className="flex flex-col pb-0">
          <SheetHeader>
            <SheetTitle className="text-2xl">Add About Me</SheetTitle>
            <SheetDescription>
              Share a brief introduction to let companies know who you are.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 flex-1 relative">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 h-full flex flex-col justify-between"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="aboutMe"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Write here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Describe yourself between 50 to 255 characters.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-4 flex gap-4 justify-end">
                  <Button
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
                    Add About Me{' '}
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

export default ProfileAboutMe;
