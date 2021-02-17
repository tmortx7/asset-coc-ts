import { Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC } from "react";
import { BaseProps } from "../base-props";
import { FormControl } from "../form-control";

export type InputControlPasswordProps = BaseProps & { inputProps?: InputProps };

export const InputControl_password: FC<InputControlPasswordProps> = (
  props: InputControlPasswordProps
) => {
  const { name, label, inputProps,...rest } = props;
  const [field ] = useField(name);

  return (
    <FormControl name={name} label={label}  {...rest}>
      <Input type="password" size="sm" {...field} id={name} {...inputProps} />
    </FormControl>
  );
};

export default InputControl_password;
