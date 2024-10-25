"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface IProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  name: string;
  label: string;
}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  name,
  label,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
      {...register(name)}
      errorMessage={
        errors[name] ? (errors[name]?.message as string) : undefined
      }
      isInvalid={!!errors[name]}
    />
  );
};

export default FXInput;
