import { Box, Input, InputProps } from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC } from "react";
import { BaseProps } from "../base-props";
import { FormControl } from "../form-control";

export type InputControlProps = BaseProps & { inputProps?: InputProps };

export const InputControl: FC<InputControlProps> = (
  props: InputControlProps
) => {
  const { name, label, inputProps, ...rest } = props;
  const [field] = useField(name);

  return (
    <Box>
      <FormControl name={name} label={label} {...rest}>
        <Input
          size="xs"
          {...field}
          id={name}
          {...inputProps}
          autoComplete="off"
        />
      </FormControl>
    </Box>
  );
};

export default InputControl;
