import { chakra } from "@chakra-ui/react";

export const TableWrap = chakra("div", {
  baseStyle: {
    fontFamily: "Open Sans, Helvetica, Arial, Verdana, sans-serif",
    table: {
      minWidth: "400px",
      width: "100%",
      borderCollapse: "colapse",
      borderSpacing: "0px",
      fontSize: "12px",
      borderColor: "#dbdcdd",
    },
    td: {
      textAlign: "left",
      borderStyle: "solid",
      borderWidth: "0 0 1px 1px",
      fontSize: "12px",
      padding: "5px 3px 1px",
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
      padding: "5px 3px 1x",
      fontWeight: "bold",
      fontSize: "12px",
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
      fontSize: "12px",
      fontStyle: "italic",
      textAlign: "right",
      padding: "6px 0",
    },
  },
});
