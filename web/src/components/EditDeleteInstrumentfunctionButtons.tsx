import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeleteInstrumentfunctionMutation} from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface EditDeleteInstrumentfunctionButtonsProps {
  id: number;
}

export const EditDeleteInstrumentfunctionButtons: React.FC<EditDeleteInstrumentfunctionButtonsProps> = ({
  id,
}) => {
  const [,deleteInstrumentfunction] = useDeleteInstrumentfunctionMutation();


  return (
    <Box>
    <NextLink href="/instrumentfunction/edit/[id]" as={`/instrumentfunction/edit/${id}`}>
      <IconButton as={Link} mr={4} icon={<EditIcon />} aria-label="Edit Instrument Function" />
    </NextLink>
    <IconButton
      icon={<DeleteIcon />}
      aria-label="Delete Instrument Function"
      onClick={() => {
        deleteInstrumentfunction({ id });
      }}
    />
  </Box>
  );
};