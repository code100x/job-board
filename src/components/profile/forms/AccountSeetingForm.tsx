import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  UserPasswordSchema,
  UserPasswordSchemaType,
} from '@/lib/validators/user.profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TriangleAlert } from 'lucide-react';
import { changePassword } from '@/actions/user.profile.actions';
import { useToast } from '@/components/ui/use-toast';
import { DeleteAccountDialog } from '../DeleteAccountDialog';

const AccountSeetingForm = ({ handleClose }: { handleClose: () => void }) => {
  const form = useForm<UserPasswordSchemaType>({
    resolver: zodResolver(UserPasswordSchema),
    defaultValues: {
      confirmNewPassword: '',
      currentPassword: '',
      newPassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit = async (values: UserPasswordSchemaType) => {
    try {
      const response = await changePassword(values);

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
        variant: 'destructive',
        title: 'Something went wrong while updating.',
      });
    }
  };

  const handleFormClose = () => {
    form.clearErrors();
    form.reset();
    handleClose();
  };

  return (
    <div className=" flex-1 relative">
      <h2 className="text-xl mb-4 font-bold">Change password</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col justify-between border px-3 py-3 rounded-sm"
        >
          <div className="flex flex-col gap-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Current Password </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Current Password"
                      type="password"
                      {...field}
                      className="rounded-[8px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="New Password"
                      type="password"
                      {...field}
                      className="rounded-[8px]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm New Password"
                      {...field}
                      className="rounded-[8px]"
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="py-4 flex gap-4 justify-end">
              <Button
                type="reset"
                onClick={handleFormClose}
                variant={'outline'}
                className="mt-0 text-slate-500 dark:text-slate-400 rounded-[8px]"
              >
                Cancel
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="mt-0 text-white rounded-[8px]"
              >
                {form.formState.isSubmitting
                  ? 'Please wait...'
                  : 'Update Profile'}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <div className="h-60 bg-red-600 bg-opacity-10 mt-5 rounded-md flex flex-col justify-center items-center p-6 text-center ">
        <TriangleAlert height={32} width={32} className="text-[#DD503F]" />
        <h4 className="text-xl font-bold dark:text-slate-50 text-[#020817] ">
          Delete account
        </h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <DeleteAccountDialog />
      </div>
    </div>
  );
};

export default AccountSeetingForm;
