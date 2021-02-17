import { useDepartmentQuery } from "../generated/graphql";
import { useGetIntId } from "./useGetIntId";

export const useGetDepartmentFromUrl = () => {
  const intId = useGetIntId();
  return useDepartmentQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
