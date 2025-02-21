import { mistralLastedModels, openAILastedModels } from '@/core/constants/llm-models';
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
  FormLabel,
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
  provider?: string;
};

export const LLMModelCombobox = ({ form, control, disabled, name, provider }: ComboboxProps) => {
  const currentModels = provider === 'openai' ? openAILastedModels : mistralLastedModels;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="font-semibold">Model</FormLabel>
          <Popover>
            <PopoverTrigger asChild disabled={disabled}>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn('w-full justify-between', !field.value && 'text-muted-foreground')}
                >
                  {field.value ? currentModels.find(model => model === field.value) : 'Select model'}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {currentModels.map(model => (
                      <CommandItem
                        value={model}
                        key={model}
                        onSelect={() => {
                          form.setValue(name, model);
                        }}
                      >
                        {model}
                        <Check className={cn('ml-auto', model === field.value ? 'opacity-100' : 'opacity-0')} />
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
