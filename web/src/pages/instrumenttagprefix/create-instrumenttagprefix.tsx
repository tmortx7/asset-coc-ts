import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Header from "../../components/header";
import Layout from "../../components/layout";
import {
  useCreateInstrumentTagprefixMutation,
  useGetallinstrumentfunctionsQuery,
  useGetallmeasuredvariablesQuery,
} from "../../generated/graphql";
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "../../theme/components/formik";
import { createUrqlClient } from "../../utils/createUrqlClient";

//import { toErrorMap } from "../utils/toErrorMap";
interface createInstrumentTagprefixProps {}

const validationSchema = Yup.object({
  tagprefix: Yup.string().required(),
  measuredvariableId: Yup.number().required(),
  instrumentfunctionId: Yup.number().required(),
});

const CreateInstrumentTagprefixPage: React.FC<createInstrumentTagprefixProps> = ({}) => {
  const router = useRouter();
  const [{ data: data1 }] = useGetallmeasuredvariablesQuery();
  const [{ data: data2 }] = useGetallinstrumentfunctionsQuery();

  //const router = useRouter();
  const [, createInstrumentTagprefix] = useCreateInstrumentTagprefixMutation();
  return (
    <div>
      <Layout>
        <Header />
        <GridItem colStart={5} colSpan={4} rowStart={2} rowSpan={6}>
          <Formik
            initialValues={{
              tagprefix: "",
              description: "",
              note: "",
              measuredvariableId: 1,
              instrumentfunctionId: 1,
            }}
            onSubmit={async (values) => {
              await createInstrumentTagprefix({
                measuredvariableId: Number(values.measuredvariableId),
                instrumentfunctionId: Number(values.instrumentfunctionId),
                tagprefix: values.tagprefix,
                description: values.description,
                note: values.note,
              });

              router.push("/instrumenttagprefix/");
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
                <InputControl name="tagprefix" label="Instrument Tag Prefix" />
                <SelectControl
                  label="Measured Input"
                  name="measuredvariableId"
                  selectProps={{ placeholder: "Select variable" }}
                >
                  {data1 &&
                    data1.getAllMeasuredvariables &&
                    data1.getAllMeasuredvariables.map((mvx: any) => (
                      <option key={mvx.id} value={mvx.id}>
                        {mvx.measuredvariable}
                      </option>
                    ))}
                </SelectControl>
                <SelectControl
                  label="Instrument Function"
                  name="instrumentfunctionId"
                  selectProps={{ placeholder: "Select Instrument" }}
                >
                  {data2 &&
                    data2.getAllInstrumentfunctions &&
                    data2.getAllInstrumentfunctions.map((instx: any) => (
                      <option key={instx.id} value={instx.id}>
                        {instx.instrumentfunction}
                      </option>
                    ))}
                </SelectControl>
                <InputControl name="description" label="Description" />

                <TextareaControl name="note" label="Note" />

                <ButtonGroup>
                  <SubmitButton>Submit</SubmitButton>
                </ButtonGroup>
              </Box>
            )}
          </Formik>
        </GridItem>
      </Layout>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(CreateInstrumentTagprefixPage);
