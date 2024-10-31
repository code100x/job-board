import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LoadingSpinner } from '../loading-spinner';

export type TcomboBoxValue = { value: string; label: string };

export function ProfileComboBox({
  dropdownValues,
  setComboBoxInputValue,
  isLoading,
  setComboBoxSelectedValues,
  comboBoxSelectedValues,
}: {
  comboBoxSelectedValues: string[];
  isLoading: boolean;
  setComboBoxInputValue: React.Dispatch<React.SetStateAction<string>>;
  dropdownValues: TcomboBoxValue[];
  setComboBoxSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between border border-slate-200 dark:bg-gray-800 text-slate-500 rounded-[8px] dark:text-white"
        >
          Enter Skills
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-full p-0">
        <Command>
          <CommandInput
            className="w-full"
            onValueChange={(value) => {
              setComboBoxInputValue(value);
            }}
            placeholder="Search skillset ..."
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>
                <LoadingSpinner></LoadingSpinner>
              </CommandEmpty>
            ) : (
              <>
                {!dropdownValues.length && (
                  <CommandEmpty>No framework found.</CommandEmpty>
                )}

                <CommandGroup>
                  {dropdownValues.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                        setComboBoxSelectedValues((prev) => {
                          const foundSelectedValueIndex = prev.findIndex(
                            (val) => val === item.value
                          );
                          if (foundSelectedValueIndex < 0) {
                            return [...prev, currentValue];
                          } else return prev;
                        });
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          comboBoxSelectedValues.includes(item.value)
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
