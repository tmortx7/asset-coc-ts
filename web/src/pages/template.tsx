import { Box, ButtonGroup, GridItem, HStack, VStack } from "@chakra-ui/react";
import { Formik } from "formik";
import * as React from "react";
import Header from "../components/header";
import Layout from "../components/layout";
import {
  InputControl,
  SelectControl,
  SubmitButton,
} from "../theme/components/formik";

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

const onSubmit = (values: Values) => {
  console.log(values);
};

const TemplatePage: React.FC<Values> = () => {
  return (
    <Layout>
      <Header />
      <GridItem colStart={3} colSpan={6} rowStart={4} rowSpan={6}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ handleSubmit, values, errors }) => (
            <Box h="100%" w="100%" as="form" m="10px auto">
              <VStack alignContent="left">
                <HStack spacing="24px" w="100%">
                  <InputControl
                    width="240px"
                    name="firstName"
                    label="First Name"
                  />
                  <InputControl
                    width="240px"
                    name="lastName"
                    label="Last Name"
                  />
                </HStack>
                <HStack spacing="24px" w="100%">
                  <InputControl
                    width="240px"
                    name="firstName"
                    label="First Name"
                  />
                  <SelectControl
                    width="240px"
                    label="Select MV"
                    name="select"
                    selectProps={{ placeholder: "Select variable" }}
                  >
                    <option value="Temperature">Temperature</option>
                    <option value="Pressure">Pressure</option>
                    <option value="Flow">Flow</option>
                  </SelectControl>
                </HStack>
                <ButtonGroup w="100%" alignItems="left">
                 <SubmitButton>Submit</SubmitButton>
                </ButtonGroup>
              </VStack>
            </Box>
          )}
        </Formik>
      </GridItem>
    </Layout>
  );
};

export default TemplatePage;
