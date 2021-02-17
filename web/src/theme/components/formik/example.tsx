import { Box, ButtonGroup, Radio } from "@chakra-ui/react";
import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  PinInputControl,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SliderControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from "../components/formik";

interface Values {
  firstName: string;
  lastName: string;
  age: number;
  employed: boolean;
  favoriteColor: string;
  toppings: string[];
  notes: string;
  employedd: boolean;
  select: string;
  foo: number;
  bar: string;
}
const onSubmit = (values: Values) => {
  console.log(values);
};

const initialValues: Values = {
  firstName: "",
  lastName: "",
  age: 0,
  employed: false,
  favoriteColor: "",
  toppings: ["tuna"],
  notes: "",
  employedd: false,
  select: "",
  foo: 23,
  bar: "",
};
const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  age: Yup.number().required().min(18),
  employed: Yup.boolean().equals([true]),
  favoriteColor: Yup.string(),
  toppings: Yup.array().min(2),
  notes: Yup.string().required(),
  employedd: Yup.boolean().equals([true]),
  select: Yup.string().required(),
  foo: Yup.number(),
  bar: Yup.string().length(4),
});

const ExamplePage: React.FC<Values> = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values, errors }) => (
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form"
            onSubmit={handleSubmit as any}
          >
            <InputControl name="firstName" label="First Name" />
            <InputControl name="lastName" label="Last Name" />
            <NumberInputControl name="age" label="Age" />
            <CheckboxSingleControl name="employed">
              Employed
            </CheckboxSingleControl>
            <RadioGroupControl name="favoriteColor" label="Favorite Color">
              <Radio value="#ff0000">Red</Radio>
              <Radio value="#00ff00">Green</Radio>
              <Radio value="#0000ff">Blue</Radio>
            </RadioGroupControl>
            <CheckboxContainer name="toppings" label="Toppings">
              <CheckboxControl name="toppings" value="chicken">
                🐓 Chicken
              </CheckboxControl>
              <CheckboxControl name="toppings" value="ham">
                🐷 Ham
              </CheckboxControl>
              <CheckboxControl name="toppings" value="mushrooms">
                🍄 Mushrooms
              </CheckboxControl>
              <CheckboxControl name="toppings" value="cheese">
                🧀 Cheese
              </CheckboxControl>
              <CheckboxControl name="toppings" value="tuna">
                🐟 Tuna
              </CheckboxControl>
              <CheckboxControl name="toppings" value="pineapple">
                🍍 Pineapple
              </CheckboxControl>
            </CheckboxContainer>
            <TextareaControl name="notes" label="Notes" />
            <SwitchControl name="employedd" label="Employed" />
            <SelectControl
              label="Select MV"
              name="select"
              selectProps={{ placeholder: "Select variable" }}
            >
              <option value="Temperature">Temperature</option>
              <option value="Pressure">Pressure</option>
              <option value="Flow">Flow</option>
            </SelectControl>
            <SliderControl name="foo" sliderProps={{ max: 40 }} />
            <PinInputControl
              name="bar"
              pinAmount={4}
              pinInputProps={{ size: "sm" }}
            />

            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
              <ResetButton>Reset</ResetButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default ExamplePage;
