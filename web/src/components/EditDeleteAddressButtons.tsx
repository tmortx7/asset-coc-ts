import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteaddressMutation } from "../generated/graphql";

interface EditDeleteAddressButtonsProps {
  id: number;
}

export const EditDeleteAddressButtons: React.FC<EditDeleteAddressButtonsProps> = ({
  id,
}) => {
  const [, deleteAddress] = useDeleteaddressMutation();

  return (
    <Box>
      <NextLink
        href="/address/edit/[id]"
        as={`/address/edit/${id}`}
      >
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Address"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Address"
        onClick={() => {
          deleteAddress({ id });
        }}
      />
    </Box>
  );
};
