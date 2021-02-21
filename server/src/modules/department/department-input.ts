import { InputType, Field } from "type-graphql";

import {Department} from '../../entities/Department';

@InputType()
export class DepartmentInput implements Partial<Department> {
  @Field()
  department: string;

  @Field()
  description: string;

  @Field()
  note: string;
}