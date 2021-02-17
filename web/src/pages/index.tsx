import { GridItem } from "@chakra-ui/react";
import React from "react";
import Header from "../components/header";
import Layout from "../components/layout";

const IndexPage = () => {
  return (
    <Layout>
      <Header />
      <GridItem colStart={3} colSpan={5} rowStart={3}>
        hello world
      </GridItem>
    </Layout>
  );
};

export default IndexPage;
