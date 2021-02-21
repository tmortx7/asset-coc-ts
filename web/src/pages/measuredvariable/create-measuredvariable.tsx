import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as React from "react";
import * as Yup from "yup";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useCreateMeasuredvariableMutation } from "../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../theme/components/formik";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
interface measuredvariableProps {}

const validationSchema = Yup.object({
  measuredvariableletter: Yup.string().required().max(3),
  measuredvariable: Yup.string().required(),
});

const CreateMeasuredVariable: React.FC<measuredvariableProps> = ({}) => {
  const router = useRouter();
  const [, createMeasuredvariable] = useCreateMeasuredvariableMutation();
  return (
    <div>
      <Layout>
        <Header />
        <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan={6}>
          <Formik
            initialValues={{
              measuredvariableletter: "",
              measuredvariable: "",
              description: "",
              note: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createMeasuredvariable(values);
              if (response.data?.createMeasuredvariable.errors) {
                setErrors(
                  toErrorMap(response.data.createMeasuredvariable.errors)
                );
              } else if (
                response.data?.createMeasuredvariable.measuredvariable
              ) {
                // worked
                router.push("/measuredvariable");
              }
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <Box
                height="100%"
                borderWidth="1px"
                rounded="lg"
                shadow="xl"
                maxWidth={800}
                p={6}
                m="10px auto"
                as="form"
                onSubmit={handleSubmit as any}
              >
                <InputControl
                  name="measuredvariable"
                  label="Measured Variable"
                />
                <InputControl name="measuredvariableletter" label="Abbr." />
                <InputControl name="description" label="Description" />
                <TextareaControl name="note" label="Note" />

                <ButtonGroup>
                  <SubmitButton>Submit</SubmitButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
        </GridItem>
      </Layout>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateMeasuredVariable);
