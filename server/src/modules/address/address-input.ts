import { Field, InputType, Int } from "type-graphql";
import { Address } from "../../entities/Address";

@InputType()
export class AddressInput implements Partial<Address> {
  @Field()
  pluscode: string;

  @Field(() => Int)
  siteId: number;

  @Field()
  description: string;

  @Field()
  note: string;
}
