import { useState } from 'react';
import { SkillsCombobox } from '../skills-combobox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import {
  addSkillsSchema,
  addSkillsSchemaType,
} from '@/lib/validators/user.profile.validator';
import { useToast } from '../ui/use-toast';
import { addUserSkills } from '@/actions/user.profile.actions';

export const AddSkills = () => {
  const [comboBoxSelectedValues, setComboBoxSelectedValues] = useState<
    string[]
  >([]);

  const form = useForm<addSkillsSchemaType>({
    resolver: zodResolver(addSkillsSchema),
    defaultValues: {
      skills: [],
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

      form.reset(form.formState.defaultValues);
      setComboBoxSelectedValues([]);
    } catch (_error) {
      toast({
        title: 'Something went wrong while Adding Skills',
        description: 'Internal server error',
        variant: 'destructive',
      });
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
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};
