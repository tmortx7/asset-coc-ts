import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import {
  useInstrumentfunctionQuery,
  useUpdateInstrumentFunctionMutation,
} from "../../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../../theme/components/formik";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditInstrumentFunction = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useInstrumentfunctionQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateInstrumentfunction] = useUpdateInstrumentFunctionMutation();
  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data?.instrumentfunction) {
    return (
      <div>
        <Box>could not find post</Box>
      </div>
    );
  }

  return (
    <Layout>
      <Header />
      <GridItem colStart={4} colSpan={4} rowStart={3}>
        <Formik
          initialValues={{
            instrumentfunctionletter: data.instrumentfunction.instrumentfunctionletter,
            instrumentfunction: data.instrumentfunction.instrumentfunction,
            description: data.instrumentfunction.description,
            note: data.instrumentfunction.note,
          }}
          onSubmit={async (values) => {
            await updateInstrumentfunction({variables: { id: intId, ...values }});
            console.log(values)
            router.back();
          }}
        >
          {({ handleSubmit }) => (
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
              <InputControl name="instrumentfunctionletter" label="Abbr." />
              <InputControl name="instrumentfunction" label="Instrument Function" />
              <InputControl name="description" label="Description" />
              <TextareaControl name="note" label="Notes" />

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

export default withUrqlClient(createUrqlClient)(EditInstrumentFunction);
