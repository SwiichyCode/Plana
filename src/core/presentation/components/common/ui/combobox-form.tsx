import { cn } from '@/core/presentation/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Control, UseFormReturn } from 'react-hook-form';

import { Button } from './button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './command';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type ComboboxProps = {
  form: UseFormReturn<any>;
  control?: Control<any>;
  name: string;
};

const aiProviders = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Mistral', value: 'mistral' },
] as const;

export const ComboboxForm = ({ form, control, name }: ComboboxProps) => {
  return (
    <FormField
      control={control}
      name="aiProvider"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('w-[200px] justify-between', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? aiProviders.find(provider => provider.value === field.value)?.label : 'Select model'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {aiProviders.map(provider => (
                      <CommandItem
                        value={provider.label}
                        key={provider.value}
                        onSelect={() => {
                          form.setValue('aiProvider', provider.value);
                        }}
                      >
                        {provider.label}
                        <Check
                          className={cn('ml-auto', provider.value === field.value ? 'opacity-100' : 'opacity-0')}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>This is the model you want to use for this project.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
