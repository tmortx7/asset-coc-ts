import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { getConnection } from "typeorm";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Department } from "../../entities/Department";
import { DepartmentInput } from "./department-input";
import { FieldError} from '../shared/FieldError';

@ObjectType()
class DepartmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Department, { nullable: true })
  department?: Department;
}

@Resolver(Department)
export class DepartmentResolver {
  constructor(
    @InjectRepository(Department) private readonly departmentRepository: Repository<Department>,
   ) {}
  @Query(() => [Department])
  allDepartments(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  @Query(() => Department, { nullable: true })
  department(@Arg("id") id: number): Promise<Department | undefined> {
    return this.departmentRepository.findOne(id);
  }
  @Mutation(() => DepartmentResponse)
  async createDepartment(
    @Arg("input") input: DepartmentInput
  ): Promise<DepartmentResponse> {
    let department;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Department)
        .values({
          department: input.department,
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      department = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "department",
              message: "department already taken",
            },
          ],
        };
      }
    }

    return { department };
  }
}
