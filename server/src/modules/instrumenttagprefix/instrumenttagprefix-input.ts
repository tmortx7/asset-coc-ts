import { Field, InputType, Int } from "type-graphql";
import { InstrumentTagPrefix } from "../../entities/InstrumentTagPrefix";

@InputType()
export class InstrumentTagPrefixInput implements Partial<InstrumentTagPrefix> {
  @Field()
  tagprefix: string;

  @Field(() => Int)
  instrumentfunctionId: number;

  @Field(() => Int)
  measuredvariableId: number;

  @Field()
  description: string;

  @Field()
  note: string;
}
