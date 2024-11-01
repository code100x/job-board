import { useState } from 'react';
import { Combobox } from './comboBox';
import { Button } from './ui/button';
import { FormLabel } from './ui/form';
import { useDebounce } from '@uidotdev/usehooks';
import { getBearerToken } from '@/actions/skills.cron';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { JobPostSchemaType } from '@/lib/validators/jobs.validator';
import _ from 'lodash';
import { X } from 'lucide-react';
import { addSkillsSchemaType } from '@/lib/validators/user.profile.validator';

export function SkillsCombobox({
  form,
  comboBoxSelectedValues,
  setComboBoxSelectedValues,
}: {
  comboBoxSelectedValues: string[];
  form: UseFormReturn<JobPostSchemaType> | UseFormReturn<addSkillsSchemaType>;
  setComboBoxSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [comboBoxInputValue, setComboBoxInputValue] = useState('');
  const [comboBoxLoading, setComboBoxLoading] = useState(false);
  const [skillDropdownValues, setSkillDropdownValues] = useState<
    {
      value: string;
      label: string;
    }[]
  >([{ value: '', label: '' }]);

  const debouncedComboboxValues = useDebounce(comboBoxInputValue, 300);

  async function fetchDropdownValues(searchTerm: string) {
    setComboBoxLoading(true);
    fetch(
      `https://emsiservices.com/skills/versions/latest/skills?q=${searchTerm}&fields=name&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${await getBearerToken()}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: { data: { name: string }[] }) => {
        const dropdownValues = data.data.map((d) => {
          return { value: d.name, label: d.name };
        });
        setSkillDropdownValues(dropdownValues);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setComboBoxLoading(false);
      });
  }

  React.useEffect(() => {
    !!debouncedComboboxValues.length
      ? fetchDropdownValues(debouncedComboboxValues)
      : fetchDropdownValues('javascript');
  }, [debouncedComboboxValues]);

  React.useEffect(() => {
    (form as UseFormReturn<addSkillsSchemaType>).setValue(
      'skills',
      comboBoxSelectedValues
    );
  }, [comboBoxSelectedValues, form]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <FormLabel className="font-medium">Skills Required</FormLabel>
        <Combobox
          comboBoxSelectedValues={comboBoxSelectedValues}
          setComboBoxSelectedValues={setComboBoxSelectedValues}
          setComboBoxInputValue={setComboBoxInputValue}
          dropdownValues={skillDropdownValues}
          isLoading={comboBoxLoading}
        ></Combobox>
      </div>

      <div className="flex flex-wrap gap-2 space-y-0">
        {comboBoxSelectedValues.map((item, index) => (
          <div key={index} className="flex items-csele space-y-0 group">
            <div
              className={`font-medium text-xs cursor-pointer flex gap-1 text-center justify-start py-2 px-4 rounded-full borderpr-1 bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10 bg-opacity-90 text-blue-700 dark:text-blue-400 border-blue-800 dark:border-blue-400 '}`}
            >
              {_.startCase(item.toLowerCase())}
              {
                <Button
                  className="p-0 h-fit bg-tranparent"
                  onClick={() => {
                    setComboBoxSelectedValues((prev) => {
                      const foundIndex = prev.findIndex((val) => val === item);
                      if (foundIndex >= 0) {
                        const updatedComboBoxSelectedValues = [...prev];
                        updatedComboBoxSelectedValues.splice(foundIndex, 1);
                        return updatedComboBoxSelectedValues;
                      }
                      return prev;
                    });
                  }}
                  aria-label="x"
                >
                  <X className="text-white" size={15} />
                </Button>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
