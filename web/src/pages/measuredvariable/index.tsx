import { Box, Flex, GridItem, Link, LinkBox, Spacer } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
//import { EditDeleteDepartmentButtons } from "../../components/EditDeleteDepartmentButtons";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useAllMeasuredvariablesQuery } from "../../generated/graphql";
import { TableWrap } from "../../theme/style";
import { createUrqlClient } from "../../utils/createUrqlClient";
const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  console.log(variables);

  const [{ data, fetching }] = useAllMeasuredvariablesQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  return (
    <Layout>
      <Header />
      <GridItem colStart={3} colSpan={5} rowStart={3}>
        <LinkBox as="article" h="100%" w="100% " >
          <TableWrap>
            <Box
              width="100%"
              height="26px"
              borderColor="#e5e5e5"
              borderWidth="1px"
            >
              <Flex h="100%" w="100%">
                <Spacer />
                <NextLink href="/">
                  <Link
                    fontSize="12px"
                    size="xs"
                    mr="4px"
                    mt="2px"
                    textDecoration="none"
                    textColor="#767676"
                  >
                    create
                  </Link>
                </NextLink>
              </Flex>
            </Box>
            <table>
              <caption>measured variable 2021</caption>
              <thead>
                <tr>
                  <th>Abbr.</th>
                  <th>Measured Variable</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.allMeasuredvariables &&
                  data.allMeasuredvariables.map((p: any) =>
                    !p ? null : (
                      <tr key={p.id}>
                        <td><NextLink href="/measuredvariable/edit/[id]" as={`/measuredvariable/edit/${p.id}`}>{p.measuredvariableletter}</NextLink></td>
                        <td>{p.measuredvariable}</td>
                        <td>{p.description}</td>
                      </tr>
                    )
                  )}
              </tbody>
            </table>
          </TableWrap>
        </LinkBox>
      </GridItem>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
