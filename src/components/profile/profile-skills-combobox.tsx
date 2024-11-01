import { useState } from 'react';
import { Button } from '../ui/button';
import { FormLabel } from '../ui/form';
import { useDebounce } from '@uidotdev/usehooks';
import { getBearerToken } from '@/actions/skills.cron';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { JobPostSchemaType } from '@/lib/validators/jobs.validator';
import _ from 'lodash';
import { X } from 'lucide-react';
import { addSkillsSchemaType } from '@/lib/validators/user.profile.validator';
import { ProfileComboBox } from './profileComboBox';

export function ProfileSkillsCombobox({
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
        <FormLabel className="font-medium">Skills</FormLabel>
        <ProfileComboBox
          comboBoxSelectedValues={comboBoxSelectedValues}
          setComboBoxSelectedValues={setComboBoxSelectedValues}
          setComboBoxInputValue={setComboBoxInputValue}
          dropdownValues={skillDropdownValues}
          isLoading={comboBoxLoading}
        ></ProfileComboBox>
      </div>
      {comboBoxSelectedValues.length !== 0 && (
        <div className="flex mt-3 flex-wrap gap-3 space-y-0 p-4 dark:bg-slate-900 bg-slate-100 rounded-[16px]">
          {comboBoxSelectedValues.map((item, index) => (
            <div key={index} className="flex items-csele space-y-0 group">
              <div
                className={`font-medium text-sm cursor-pointer flex items-center gap-1 text-center justify-start py-2 px-4 rounded-full borderpr-1 bg-slate-500 bg-opacity-10  dark:bg-opacity-10 text-slate-500  dark:text-slate-400 '}`}
              >
                {_.startCase(item.toLowerCase())}
                {
                  <Button
                    className="p-0 h-fit bg-tranparent hover:bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      setComboBoxSelectedValues((prev) => {
                        const foundIndex = prev.findIndex(
                          (val) => val === item
                        );
                        if (foundIndex >= 0) {
                          const updatedComboBoxSelectedValues = [...prev];
                          updatedComboBoxSelectedValues.splice(foundIndex, 1);
                          return updatedComboBoxSelectedValues;
                        }
                        return prev;
                      });
                    }}
                  >
                    <X className="text-slate-500" size={15} />
                  </Button>
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
