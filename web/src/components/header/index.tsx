import { Box, Center, Flex, GridItem, HStack, Text } from "@chakra-ui/react";
import React from "react";
import COClogo from "./logo";
const HeaderPage = () => {
  return (
    <GridItem colStart={1} colSpan={12} rowStart={1}>
      <Box
        height={{
          base: "75%",
          md: "85%",
          xl: "100%",
        }}
        bg="#f6f6f6"
        width="100%"
        boxShadow="base"
        zIndex="hide"
      >
        <Flex h="100%" w="100%" zIndex="overlay" height="78px">
          <Center>
            <HStack spacing="5px">
              <COClogo />
              <Text
                fontSize="24px"
                fontWeight="400"
                lineHeight="1.5"
                color="#333"
              >
                Application title
              </Text>
            </HStack>
          </Center>
        </Flex>
        <Flex
          w="100%"
          backgroundColor="#ededee"
          h="64px"
          justifyItems="left"
          alignItems="center"
        >
          <HStack spacing="24px">
            <Box ml="20px"></Box>
          </HStack>
        </Flex>
      </Box>
    </GridItem>
  );
};
export default HeaderPage;
