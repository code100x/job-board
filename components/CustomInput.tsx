import { FieldValues, FieldPath, ControllerProps } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type CustomFormFieldProps = {
  label?: string;
  optional?: boolean;
  disabled?: boolean;
  className?: string;
  placeholderText?: string;
  type?: "text" | "emai" | "password";
};

const CustomInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  placeholderText,
  optional = false,
  disabled,
  className,
  type,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> &
  CustomFormFieldProps) => {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold text-gray-800">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholderText}
              disabled={disabled}
              {...field}
              className={cn("w-full border-gray-400", className)}
            />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
      {...props}
    />
  );
};

export default CustomInput;
