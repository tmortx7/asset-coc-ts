import Layout from '../components/layout';
import { GridItem } from '@chakra-ui/react';
import Register from '../components/register';

const IndexPage = () => (
  <Layout>
    <GridItem colStart={5} colSpan = {4} rowStart={2}><Register /></GridItem>
  </Layout>
);

export default IndexPage;
