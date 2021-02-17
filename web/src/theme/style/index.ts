import { chakra } from "@chakra-ui/react";

export const TableWrap = chakra("div", {
  baseStyle: {
    fontFamily: "Open Sans, Helvetica, Arial, Verdana, sans-serif",
    table: {
      width: "100%",
      borderCollapse: "colapse",
      borderSpacing: "0px",
      fontSize: "16px",
      borderColor: "#dbdcdd",
    },
    td: {
      textAlign: "left",
      borderStyle: "solid",
      borderWidth: "0 0 1px 1px",
      fontSize: "16px",
      padding: "6px 12px",
      borderColor: "#dbdcdd",
      textColor: "#333",
    },
    th: {
      textAlign: "left",
      backgroundColor: "#f6f6f6",
      textColor: "#333",
      borderStyle: "solid",
      borderColor: "#dbdcdd",
      borderWidth: "1px",
      padding: "6px 12px",
      fontWeight: "bold",
      fontSize: "16px",
      verticalAlign: "middle",
    },
    tr: {
      height: "23px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      _hover: { backgroundColor: "#ddd" },
      _even: { backgroundColor: "#f6f6f6" },
      _odd: { backgroundColor: "#fff" },
    },

    caption: {
      captionSide: "bottom",
      fontSize: "16px",
      fontStyle: "italic",
      textAlign: "right",
      padding: "6px 0",
    },
  },
});
