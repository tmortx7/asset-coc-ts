import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useDeleteDepartmentMutation} from "../generated/graphql";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface EditDeleteDepartmentButtonsProps {
  id: number;
}

export const EditDeleteDepartmentButtons: React.FC<EditDeleteDepartmentButtonsProps> = ({
  id,
}) => {
  const [,deleteDepartment] = useDeleteDepartmentMutation();


  return (
    <Box>
    <NextLink href="/department/edit/[id]" as={`/department/edit/${id}`}>
      <IconButton as={Link} mr={4} icon={<EditIcon />} aria-label="Edit Department" />
    </NextLink>
    <IconButton
      icon={<DeleteIcon />}
      aria-label="Delete Department"
      onClick={() => {
        deleteDepartment({ id });
      }}
    />
  </Box>
  );
};