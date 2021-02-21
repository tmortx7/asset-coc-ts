import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeleteDepartmentMutation } from "../generated/graphql";

interface EditDeleteDepartmentButtonsProps {
  id: number;
}

export const EditDeleteDepartmentButtons: React.FC<EditDeleteDepartmentButtonsProps> = ({
  id,
}) => {
  const [, deleteDepartment] = useDeleteDepartmentMutation();

  return (
    <Box>
      <NextLink href="/department/edit/[id]" as={`/department/edit/${id}`}>
        <IconButton
          size="xs"
          as={Link}
          mr={4}
          icon={<EditIcon />}
          aria-label="Edit Department"
        />
      </NextLink>
      <IconButton
        size="xs"
        icon={<DeleteIcon />}
        aria-label="Delete Department"
        onClick={() => {
          deleteDepartment({ id });
        }}
      />
    </Box>
  );
};
