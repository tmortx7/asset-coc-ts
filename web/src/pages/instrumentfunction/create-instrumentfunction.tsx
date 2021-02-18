import { GridItem } from "@chakra-ui/react";
import React from 'react';
import CreateInstrumentfunction from "../../components/createinstrumentfunction";
import Layout from "../../components/layout";
import Header from '../../components/header';

const IndexPage = () => (
  <Layout>
    <Header />
    <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan= {6}>
      <CreateInstrumentfunction />
    </GridItem>
  </Layout>
);



export default IndexPage;
