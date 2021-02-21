import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import {
  useOnesiteQuery,
  useUpdateSiteMutation,
} from "../../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../../theme/components/formik";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditSite = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useOnesiteQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateSite] = useUpdateSiteMutation();
  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data?.oneSite) {
    return (
      <div>
        <Box>could not find site</Box>
      </div>
    );
  }

  return (
    <Layout>
      <Header />
      <GridItem colStart={4} colSpan={4} rowStart={3}>
        <Formik
          initialValues={{
            sitename: data.oneSite.sitename,
            sitenumber: data.oneSite.sitenumber,
            description: data.oneSite.description,
            note: data.oneSite.note,
          }}
          onSubmit={async (values) => {
            await updateSite({ id: intId, ...values });
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
              <InputControl name="sitename" label="Site Name" />
              <InputControl name="sitenumber" label="Site Number" />
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

export default withUrqlClient(createUrqlClient)(EditSite);
