import { Box, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { InputControl, SubmitButton } from "../components/formik";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const validationSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string().required(),
});

const RegisterPage: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <div>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values) => {
          await register(values);
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
            <InputControl name="username" label="User Name" />
            <InputControl name="email" label="Email" />
            <InputControl name="password" label="Password" />

            <ButtonGroup>
              <SubmitButton>Submit</SubmitButton>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;
