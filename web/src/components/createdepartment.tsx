import { Box, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as React from "react";
import * as Yup from "yup";
import { useCreate_DepartmentMutation } from "../generated/graphql";
import {
  InputControl,
  SubmitButton,
  TextareaControl,
} from "../theme/components/formik";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
interface registerProps {}

const validationSchema = Yup.object({
  department: Yup.string().required().min(4),
});

const CreateDepartmentPage: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, createDepartment] = useCreate_DepartmentMutation();
  return (
    <div>
      <Formik
        initialValues={{ department: "", description: "", note: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createDepartment(values);
          if (response.data?.createDepartment.errors) {
            setErrors(toErrorMap(response.data.createDepartment.errors));
          } else if (response.data?.createDepartment.department) {
            // worked
            router.push("/");
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box
            height="100%"
            borderWidth="1px"
            rounded="lg"
            shadow="xl"
            maxWidth={800}
            p={6}
            m="10px auto"
            as="form"
            onSubmit={handleSubmit as any}
          >
            <InputControl name="department" label="Department" />
            <InputControl name="description" label="Description" />
            <TextareaControl name="note" label="Note" />

            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateDepartmentPage);
