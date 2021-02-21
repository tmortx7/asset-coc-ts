import { Field, InputType } from "type-graphql";
import { MeasuredVariable } from "../../entities/MeasuredVariable";

@InputType()
export class MeasuredVariableInput implements Partial<MeasuredVariable> {
  @Field()
  measuredvariable: string;

  @Field()
  measuredvariableletter: string;

  @Field()
  description: string;

  @Field()
  note: string;
}
