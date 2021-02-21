import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteInstrumentfunctionMutation } from "../generated/graphql";

interface EditDeleteInstrumentfunctionButtonsProps {
  id: number;
}

export const EditDeleteInstrumentfunctionButtons: React.FC<EditDeleteInstrumentfunctionButtonsProps> = ({
  id,
}) => {
  const [, deleteInstrumentfunction] = useDeleteInstrumentfunctionMutation();

  return (
    <Box>
      <NextLink
        href="/instrumentfunction/edit/[id]"
        as={`/instrumentfunction/edit/${id}`}
      >
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Instrument Function"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Instrument Function"
        onClick={() => {
          deleteInstrumentfunction({ id });
        }}
      />
    </Box>
  );
};
