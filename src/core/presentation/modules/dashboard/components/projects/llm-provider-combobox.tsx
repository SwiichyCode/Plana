import { Button } from '@/core/presentation/components/common/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/core/presentation/components/common/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/core/presentation/components/common/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/presentation/components/common/ui/popover';
import { cn } from '@/core/presentation/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Control, UseFormReturn } from 'react-hook-form';

type ComboboxProps = {
  form: UseFormReturn<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  control?: Control<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  disabled?: boolean;
  name: string;
};

const aiProviders = [
  { label: 'OpenAI', value: 'openai' },
  { label: 'Mistral', value: 'mistral' },
] as const;

export const LLMProviderCombobox = ({ form, control, disabled, name }: ComboboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover>
            <PopoverTrigger asChild disabled={disabled}>
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
                          form.setValue(name, provider.value);
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
