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
import { SkillsCombobox } from '@/components/skills-combobox';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';

export const SkillsForm = ({ handleClose }: { handleClose: () => void }) => {
  const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<addSkillsSchemaType>({
    resolver: zodResolver(addSkillsSchema),
    defaultValues: {
      skills: [],
    },
  });
  const { toast } = useToast();
  const onSubmit = async (data: addSkillsSchemaType) => {
    try {
      setIsLoading(true);
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

      form.reset(form.formState.defaultValues);
      setComboBoxSelectedValues([]);
    } catch (_error) {
      toast({
        title: 'Something went wrong while Adding Skills',
        description: 'Internal server error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SkillsCombobox
          comboBoxSelectedValues={comboBoxSelectedValues}
          setComboBoxSelectedValues={setComboBoxSelectedValues}
          form={form}
        ></SkillsCombobox>
        {isLoading ? (
          <div className="mt-4">
            <LoadingSpinner />{' '}
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
