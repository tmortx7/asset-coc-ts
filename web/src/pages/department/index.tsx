import { Box, Button, Flex, GridItem, Link, Spacer } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeleteDepartmentButtons } from "../../components/EditDeleteDepartmentButtons";
import Header from "../../components/header";
import Layout from "../../components/layout";
import { useAllDepartmentsQuery } from "../../generated/graphql";
import { TableWrap } from "../../theme/style";
import { createUrqlClient } from "../../utils/createUrqlClient";

const IndexPage = () => {
  const [variables, setVariables] = useState({
    limit: 5,
    cursor: null as null | string,
  });
  console.log(variables);

  const [{ data, fetching }] = useAllDepartmentsQuery({
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
            <Flex h="100%" w="100%">
              <Spacer />
              <NextLink href="/createdepartment">
                <Link
                  fontSize="12px"
                  size="xs"
                  mr="4px"
                  mt="2px"
                  textDecoration="none"
                  textColor="#767676"
                >
                  Create Department
                </Link>
              </NextLink>
            </Flex>
          </Box>
          <table>
            <caption>He-Man and Skeletor facts</caption>
            <thead>
              <tr>
                <th>ID</th>
                <th>Department</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.allDepartments &&
                data.allDepartments.allDepartments.map((p: any) =>
                  !p ? null : (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.department}</td>
                      <td>
                        <EditDeleteDepartmentButtons id={p.id} />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </TableWrap>
        {data && data.allDepartments.hasMore ? (
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor:
                  data.allDepartments.allDepartments[
                    data.allDepartments.allDepartments.length - 1
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
