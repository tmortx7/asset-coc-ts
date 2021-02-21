import { AspectRatio } from "@chakra-ui/react";
//@ts-ignore
import COClogo from "../../../../public/svg/coc-logo.svg";

const IndexPage = () => (
  <div>
    <div>
      <AspectRatio ratio={1} maxWidth="90px" minWidth="90px" mx={10} minHeight="103px" maxHeight="103px" >
        <COClogo />
      </AspectRatio>
    </div>
  </div>
);

export default IndexPage;
