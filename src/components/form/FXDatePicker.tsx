import { IInput } from "@/src/types";
import { DatePicker } from "@nextui-org/date-picker";
import { Controller } from "react-hook-form";

interface IProps extends IInput {}

const FXDatePicker = ({ label, name, variant = "bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          label={label}
          className="min-w-full sm:min-w-[225px]"
          variant={variant}
          {...fields}
        />
      )}
    />
  );
};

export default FXDatePicker;
