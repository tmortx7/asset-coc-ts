import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteInstrumentTagprefixMutation } from "../generated/graphql";

interface EditDeleteInstrumentTagprefixButtonsProps {
  id: number;
}

export const EditDeleteInstrumentTagprefixButtons: React.FC<EditDeleteInstrumentTagprefixButtonsProps> = ({
  id,
}) => {
  const [, deleteInstrumenttagprefix] = useDeleteInstrumentTagprefixMutation();

  return (
    <Box>
      <NextLink
        href="/instrumenttagprefix/edit/[id]"
        as={`/instrumenttagprefix/edit/${id}`}
      >
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Instrument Tag Prefix"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Instrument Tag Prefix "
        onClick={() => {
          deleteInstrumenttagprefix({ id });
        }}
      />
    </Box>
  );
};
