import { Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC } from "react";
import { BaseProps } from "../base-props";
import { FormControl } from "../form-control";

export type InputControlEmailProps = BaseProps & { inputProps?: InputProps };

export const InputControl_email: FC<InputControlEmailProps> = (
  props: InputControlEmailProps
) => {
  const { name, label, inputProps,...rest } = props;
  const [field ] = useField(name);

  return (
    <FormControl name={name} label={label}  {...rest}>
      <Input type="email" size="sm" {...field} id={name} {...inputProps} />
    </FormControl>
  );
};

export default InputControl_email;
