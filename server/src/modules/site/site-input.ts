import { InputType, Field } from "type-graphql";

import {Site} from '../../entities/Site';

@InputType()
export class SiteInput implements Partial<Site> {
  @Field()
  sitename: string;

  @Field()
  sitenumber: string;

  @Field()
  description: string;

  @Field()
  note: string;
}