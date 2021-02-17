import { Box, GridItem, Heading } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { EditDeleteDepartmentButtons } from "../../components/EditDeleteDepartmentButtons";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetDepartmentFromUrl } from "../../utils/useGetDepartmentFromUrl";

const Department = ({}) => {
  const [{ data, error, fetching }] = useGetDepartmentFromUrl();

  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.department) {
    return (
      <div>
        <Box>could not find department</Box>
      </div>
    );
  }

  return (
    <Layout>
      <Header />
      <GridItem colStart={4} colSpan={4} rowStart={3}>
        <Heading mb={4}>{data.department.department}</Heading>
        <Box mb={4}>{data.department.department}</Box>
        <Box mb={4}>{data.department.description}</Box>
        <Box mb={4}>{data.department.note}</Box>
        <EditDeleteDepartmentButtons id={data.department.id} />
      </GridItem>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Department);
