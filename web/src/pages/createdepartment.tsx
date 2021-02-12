import Layout from '../components/layout';
import { GridItem } from '@chakra-ui/react';
import CreateDepartment from '../components/createdepartment';

const IndexPage = () => (
  <Layout>
    <GridItem colStart={5} colSpan = {4} rowStart={2}><CreateDepartment /></GridItem>
  </Layout>
);

export default IndexPage;
