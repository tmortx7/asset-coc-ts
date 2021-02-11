import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

interface AppProps {
  children: ReactNode;
}
const IndexPage = ({ children }: AppProps) => {
  return (
    <div>
      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(12, 1fr)"
        height="100vh"
        width="100%"
        bg="#ffffff"
      >
        {children}
      </Grid>
    </div>
  );
};

export default IndexPage;
