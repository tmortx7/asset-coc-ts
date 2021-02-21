import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteSiteMutation } from "../generated/graphql";

interface EditDeleteMeasuredvariableButtonsProps {
  id: number;
}

export const EditDeleteSiteButtons: React.FC<EditDeleteMeasuredvariableButtonsProps> = ({
  id,
}) => {
  const [, deleteSite] = useDeleteSiteMutation();

  return (
    <Box>
      <NextLink
        href="/site/edit/[id]"
        as={`/site/edit/${id}`}
      >
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Site"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Site"
        onClick={() => {
          deleteSite({ id });
        }}
      />
    </Box>
  );
};
