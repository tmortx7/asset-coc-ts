import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Department } from "../../entities/Department";
import { FieldError } from "../shared/FieldError";
import { DepartmentInput } from "./department-input";

@ObjectType()
class DepartmentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Department, { nullable: true })
  department?: Department;
}

@ObjectType()
class PaginatedDepartments {
  @Field(() => [Department])
  allDepartments: Department[];
  @Field()
  hasMore: boolean;
}

@Resolver(Department)
export class DepartmentResolver {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  @Query(() => PaginatedDepartments)
  async allDepartments(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedDepartments> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Department)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const allDepartments = await qb.getMany();

    return {
      allDepartments: allDepartments.slice(0, realLimit),
      hasMore: allDepartments.length === reaLimitPlusOne,
    };
  }
  @Query(() => Department, { nullable: true })
  department(@Arg("id", () => Int) id: number): Promise<Department | undefined> {
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

   @Mutation(() => Department, { nullable: true })
   async updateDepartment(
    @Arg("id", () => Int) id: number,
    @Arg("department") department: string,
    @Arg("description") description: string,
    @Arg("note") note: string,
  ): Promise<Department | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Department)
      .set({ department, description, note })
      .where('id = :id'  ,{
        id
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteDepartment(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Department.delete({ id });
    return true;
  }
}
