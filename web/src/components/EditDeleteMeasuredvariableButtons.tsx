import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeleteMeasuredvariableMutation} from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface EditDeleteMeasuredvariableButtonsProps {
  id: number;
}

export const EditDeleteMeasuredvariableButtons: React.FC<EditDeleteMeasuredvariableButtonsProps> = ({
  id,
}) => {
  const [,deleteMeasuredvariable] = useDeleteMeasuredvariableMutation();


  return (
    <Box>
    <NextLink href="/measuredvariable/edit/[id]" as={`/measuredvariable/edit/${id}`}>
      <IconButton as={Link} mr={4} icon={<EditIcon />} aria-label="Edit Measured Variable" />
    </NextLink>
    <IconButton
      icon={<DeleteIcon />}
      aria-label="Delete Measured Variable"
      onClick={() => {
        deleteMeasuredvariable({ id });
      }}
    />
  </Box>
  );
};