import { GridItem } from "@chakra-ui/react";
import React from 'react';
import CreateMeasuredvariable from "../../components/createmeasuredvariable";
import Layout from "../../components/layout";
import Header from '../../components/header';

const IndexPage = () => (
  <Layout>
    <Header />
    <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan= {6}>
      <CreateMeasuredvariable />
    </GridItem>
  </Layout>
);



export default IndexPage;
