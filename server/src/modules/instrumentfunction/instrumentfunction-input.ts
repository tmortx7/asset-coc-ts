import { Field, InputType } from "type-graphql";
import { InstrumentFunction } from "../../entities/InstrumentFunction";

@InputType()
export class InstrumentFunctionInput implements Partial<InstrumentFunction> {
  @Field()
  instrumentfunction: string;

  @Field()
  instrumentfunctionletter: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  note?: string;
}
