import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import {
  useMeasuredvariableQuery,
  useUpdateMeasuredVariableMutation,
} from "../../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../../theme/components/formik";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditMeasuredVariable = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useMeasuredvariableQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateMeasuredvariable] = useUpdateMeasuredVariableMutation();
  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data?.measuredvariable) {
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
            measuredvariableletter:
              data.measuredvariable.measuredvariableletter,
            measuredvariable: data.measuredvariable.measuredvariable,
            description: data.measuredvariable.description,
            note: data.measuredvariable.note,
          }}
          onSubmit={async (values) => {
            await updateMeasuredvariable({ id: intId, ...values });
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
              <InputControl name="measuredvariableletter" label="Abbr." />
              <InputControl name="measuredvariable" label="Measured Variable" />
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

export default withUrqlClient(createUrqlClient)(EditMeasuredVariable);
