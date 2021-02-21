import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useCreateInstrumentfunctionMutation } from "../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../theme/components/formik";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

interface instrumentfunctionProps {}

const validationSchema = Yup.object({
  instrumentfunctionletter: Yup.string().required().max(3),
  instrumentfunction: Yup.string().required(),
});

const CreateInstrumentFunction: React.FC<instrumentfunctionProps> = ({}) => {
  const router = useRouter();
  const [, createInstrumentfunction] = useCreateInstrumentfunctionMutation();
  return (
    <Layout>
      <Header />
      <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan={6}>
        <Formik
          initialValues={{
            instrumentfunctionletter: "",
            instrumentfunction: "",
            description: "",
            note: "",
          }}
          onSubmit={async (values, { setErrors }) => {
            const response = await createInstrumentfunction(values);
            if (response.data?.createInstrumentfunction.errors) {
              setErrors(
                toErrorMap(response.data.createInstrumentfunction.errors)
              );
            } else if (
              response.data?.createInstrumentfunction.instrumentfunction
            ) {
              // worked
              router.push("/instrumentfunction");
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
                name="instrumentfunction"
                label="Instrument Function"
              />
              <InputControl name="instrumentfunctionletter" label="Abbr." />
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
  );
};

export default withUrqlClient(createUrqlClient)(CreateInstrumentFunction);
