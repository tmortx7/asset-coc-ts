import { Box, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { InputControl, SubmitButton,TextareaControl } from "../components/formik";
import { useCreate_DepartmentMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const validationSchema = Yup.object({
  department: Yup.string().required().min(4)

});

const CreateDepartmentPage: React.FC<registerProps> = ({}) => {
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
            console.log("sucess")
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box
            borderWidth="1px"
            rounded="lg"
            shadow="1px 1px 3px rgba(0,0,0,0.3)"
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

export default CreateDepartmentPage;
