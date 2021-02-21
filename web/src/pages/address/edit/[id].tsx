import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import {
  useAllSitesQuery,
  useOneaddressQuery,
  useUpdateaddressMutation,
} from "../../../generated/graphql";
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "../../../theme/components/formik";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditAddressPage = ({}) => {
  const [{ data: data1 }] = useAllSitesQuery({
    variables: {limit: 100}
  });
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useOneaddressQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateAddress] = useUpdateaddressMutation();
  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data?.oneAddress) {
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
            siteId: data.oneAddress.siteId,
            pluscode: data.oneAddress.pluscode,
            description: data.oneAddress.description,
            note: data.oneAddress.note,
          }}
          onSubmit={async (values) => {
            await updateAddress({variables:{
              id: intId,
              siteId: Number(values.siteId),
              pluscode: values.pluscode,
              description: values.description,
              note: values.note,
            }});
            console.log(values);
            router.push("/address")
          }}
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
              <SelectControl
                defaultValue={data.oneAddress?.siteId}
                label="Site"
                name="siteId"
                selectProps={{ placeholder: "Select Site" }}
              >
                {data1 &&
                  data1.allSites &&
                  data1.allSites.allSites.map((sitex: any) => (
                    <option key={sitex.id} value={sitex.id}>
                      {sitex.sitename}
                    </option>
                  ))}
              </SelectControl>
               <InputControl name="pluscode" label="plus Code" />
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

export default withUrqlClient(createUrqlClient)(EditAddressPage);
