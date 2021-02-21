import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as React from "react";
import * as Yup from "yup";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useCreate_SiteMutation } from "../../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../../theme/components/formik";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";
interface createSiteProps {}

const validationSchema = Yup.object({
  sitename: Yup.string().required().min(4),
});

const CreateSitePage: React.FC<createSiteProps> = ({}) => {
  const router = useRouter();
  const [, createSite] = useCreate_SiteMutation();
  return (
    <div>
      <Layout>
        <Header />
        <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan={6}>
          <Formik
            initialValues={{
              sitename: "",
              sitenumber: "",
              description: "",
              note: "",
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await createSite(values);
              if (response.data?.createSite.errors) {
                setErrors(toErrorMap(response.data.createSite.errors));
              } else if (response.data?.createSite) {
                // worked
                router.push("/site");
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
                <InputControl name="sitename" label="Site Name" />
                <InputControl name="sitenumber" label="Site Number" />
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

export default withUrqlClient(createUrqlClient)(CreateSitePage);
