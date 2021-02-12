import { InputType, Field } from "type-graphql";

import {Department} from '../../entities/Department';

@InputType()
export class DepartmentInput implements Partial<Department> {
  @Field()
  department: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  note?: string;
}