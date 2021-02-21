import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}
const IndexPage = ({ children }: AppProps) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(12, 1fr)"
        height="100vh"
        width="100%"
        bg="#ffffff"
      >
        <GridItem colStart={1} rowStart={1}>
          <IconButton
            mt="26px"
            aria-label="Main Menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            borderColor="white"
          />
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Main Menu</DrawerHeader>
              <DrawerBody>
                <Wrap direction="column" align="left">
                  <WrapItem>
                    <Button
                      size="md"
                      variant="ghost"
                      onClick={() => {
                        router.push("/department");
                      }}
                    >
                      Department
                    </Button>
                  </WrapItem>
                  <WrapItem>
                    <Button
                      size="md"
                      variant="ghost"
                      onClick={() => {
                        router.push("/measuredvariable");
                      }}
                    >
                      Measured Variable
                    </Button>
                  </WrapItem>
                </Wrap>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </GridItem>
        {children}
      </Grid>
    </div>
  );
};

export default IndexPage;
