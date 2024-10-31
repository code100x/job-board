import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addSkillsSchema,
  addSkillsSchemaType,
} from '@/lib/validators/user.profile.validator';
import { addUserSkills } from '@/actions/user.profile.actions';
import { useToast } from '@/components/ui/use-toast';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProfileSkillsCombobox } from '../profile-skills-combobox';

export const SkillsForm = ({
  handleClose,
  skills,
}: {
  handleClose: () => void;
  skills: string[];
}) => {
  const [comboBoxSelectedValues, setComboBoxSelectedValues] =
    useState<string[]>(skills);

  const form = useForm<addSkillsSchemaType>({
    resolver: zodResolver(addSkillsSchema),
    defaultValues: {
      skills: skills,
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: addSkillsSchemaType) => {
    try {
      const response = await addUserSkills(data);
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
    } finally {
      handleClose();
    }
  };

  const handleFormClose = () => {
    form.reset();
    form.clearErrors();
    setComboBoxSelectedValues([]);
    handleClose();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col justify-between"
      >
        <div>
          <ProfileSkillsCombobox
            comboBoxSelectedValues={comboBoxSelectedValues}
            setComboBoxSelectedValues={setComboBoxSelectedValues}
            form={form}
          ></ProfileSkillsCombobox>
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
            {form.formState.isSubmitting ? 'Please wait ...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
