import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as React from "react";
import * as Yup from "yup";
import HeaderPage from "../../components/header";
import Layout from "../../components/layout";
import {
  useAllSitesQuery,
  useCreateaddressMutation,
} from "../../generated/graphql";
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "../../theme/components/formik";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
interface addressProps {}

const validationSchema = Yup.object({
  siteId: Yup.number().required(),
});

const CreateAddress: React.FC<addressProps> = ({}) => {
  const [{ data }] = useAllSitesQuery({ variables: { limit: 500 } });
  const router = useRouter();
  const [, createAddress] = useCreateaddressMutation();
  return (
    <div>
      <Layout>
        <HeaderPage />
        <GridItem colStart={4} colSpan={4} rowStart={3}>
          <Formik
            initialValues={{
              siteId: 0,
              pluscode: "",
              description: "",
              note: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createAddress({
                siteId: Number(values.siteId),
                pluscode: values.pluscode,
                description: values.description,
                note: values.note,
              });
              if (response.data?.createAddress.errors) {
                setErrors(toErrorMap(response.data.createAddress.errors));
              } else if (response.data?.createAddress.address) {
                // worked
                router.push("/address");
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
                <SelectControl
                  label="Site"
                  name="siteId"
                  selectProps={{ placeholder: "Select Site" }}
                >
                  {data &&
                    data.allSites &&
                    data.allSites.allSites.map((sitex: any) => (
                      <option key={sitex.id} value={sitex.id}>
                        {sitex.sitename} {sitex.sitenumber}
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
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateAddress);
