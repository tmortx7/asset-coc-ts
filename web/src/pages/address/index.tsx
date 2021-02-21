import { Box, Button, Flex, GridItem, Link, Spacer } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeleteAddressButtons } from "../../components/EditDeleteAddressButtons";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useAlladdressesQuery } from "../../generated/graphql";
import { TableWrap } from "../../theme/style";
import { createUrqlClient } from "../../utils/createUrqlClient";

const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  console.log(variables);

  const [{ data, fetching }] = useAlladdressesQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>you got query failed for some reason</div>;
  }
  return (
    <Layout>
      <Header />
      <GridItem colStart={3} colSpan={5} rowStart={3}>
        <TableWrap>
          <Box
            width="100%"
            height="26px"
            borderColor="#e5e5e5"
            borderWidth="1px"
          >
            <Flex h="100%" w="100%" minWidth="400px">
              <Spacer />
              <NextLink href="/address/create-address">
                <Link
                  width="100%"
                  fontSize="12px"
                  size="xs"
                  mr="4px"
                  mt="2px"
                  textDecoration="none"
                  textColor="#767676"
                >
                  Create Address
                </Link>
              </NextLink>
            </Flex>
          </Box>
          <table>
            <caption>address 2021</caption>
            <thead>
              <tr>
                <th>pluscode</th>
                <th>Description</th>
                <th>Site</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.allAddresses&&
                data.allAddresses.allAddresses.map((p: any) =>
                  !p ? null : (
                    <tr key={p.id}>
                      <td>{p.pluscode}</td>
                      <td>{p.description}</td>
                      <td>{p.site.sitename}</td>
                      <td>
                        <EditDeleteAddressButtons id={p.id} />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </TableWrap>
        {data && data.allAddresses.hasMore ? (
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.allAddresses.allAddresses[
                    data.allAddresses.allAddresses.length - 1
                  ].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            load more
          </Button>
        ) : null}
      </GridItem>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(IndexPage);
