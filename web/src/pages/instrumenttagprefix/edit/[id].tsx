import { Box, ButtonGroup, GridItem } from "@chakra-ui/react";
import { Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Header from "../../../components/header";
import Layout from "../../../components/layout";
import {
  useGetallinstrumentfunctionsQuery,
  useGetallmeasuredvariablesQuery,
  useOneinstrumenttagprefixQuery,
  useUpdateInstrumentTagprefixMutation,
} from "../../../generated/graphql";
import {
  InputControl,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "../../../theme/components/formik";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";

const EditInstrumentTagprefixPage = ({}) => {
  const [{ data: data1 }] = useGetallmeasuredvariablesQuery();
  const [{ data: data2 }] = useGetallinstrumentfunctionsQuery();
  const router = useRouter();
  const intId = useGetIntId();
  const [{ data, fetching }] = useOneinstrumenttagprefixQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updateInstrumentTagprefix] = useUpdateInstrumentTagprefixMutation();
  if (fetching) {
    return (
      <div>
        <div>loading...</div>
      </div>
    );
  }

  if (!data?.oneInstrumentTagprefix) {
    return (
      <div>
        <Box>could not find post</Box>
      </div>
    );
  }

  return (
    <Layout>
      <Header />
      <GridItem colStart={4} colSpan={4} rowStart={3}>
        <Formik
          initialValues={{
            tagprefix: data.oneInstrumentTagprefix.tagprefix,
            measuredvariableId: data.oneInstrumentTagprefix.measuredvariableId,
            instrumentfunctionId:
              data.oneInstrumentTagprefix.instrumentfunctionId,
            description: data.oneInstrumentTagprefix.description,
            note: data.oneInstrumentTagprefix.note,
          }}
          onSubmit={async (values) => {
            await updateInstrumentTagprefix({
              id: intId,
              measuredvariableId: Number(values.measuredvariableId),
              instrumentfunctionId: Number(values.instrumentfunctionId),
              tagprefix: values.tagprefix,
              description: values.description,
              note: values.note,
            });
            console.log(values);
            router.back();
          }}
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
                defaultValue={data.oneInstrumentTagprefix?.instrumentfunctionId}
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
                defaultValue={data.oneInstrumentTagprefix?.instrumentfunctionId}
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
  );
};

export default withUrqlClient(createUrqlClient)(EditInstrumentTagprefixPage);
