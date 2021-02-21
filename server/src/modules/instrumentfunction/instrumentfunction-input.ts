import { Field, InputType } from "type-graphql";
import { InstrumentFunction } from "../../entities/InstrumentFunction";

@InputType()
export class InstrumentFunctionInput implements Partial<InstrumentFunction> {
  @Field()
  instrumentfunction: string;

  @Field()
  instrumentfunctionletter: string;

  @Field()
  description: string;

  @Field()
  note: string;
}
