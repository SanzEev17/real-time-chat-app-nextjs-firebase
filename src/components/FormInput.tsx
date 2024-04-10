import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { FormInputData } from "@/types";

const FormInput = ({
  control,
  label,
  name,
  type,
  placeholder,
  className,
  ...props
}: FormInputData) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {label && <FormLabel className="text-base">{label}</FormLabel>}
          <FormControl className="w-full">
            <Input
              type={type}
              placeholder={placeholder}
              className={className}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
