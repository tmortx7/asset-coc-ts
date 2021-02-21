import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteMeasuredvariableMutation } from "../generated/graphql";

interface EditDeleteMeasuredvariableButtonsProps {
  id: number;
}

export const EditDeleteMeasuredvariableButtons: React.FC<EditDeleteMeasuredvariableButtonsProps> = ({
  id,
}) => {
  const [, deleteMeasuredvariable] = useDeleteMeasuredvariableMutation();

  return (
    <Box>
      <NextLink
        href="/measuredvariable/edit/[id]"
        as={`/measuredvariable/edit/${id}`}
      >
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Measured Variable"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Measured Variable"
        onClick={() => {
          deleteMeasuredvariable({ id });
        }}
      />
    </Box>
  );
};
