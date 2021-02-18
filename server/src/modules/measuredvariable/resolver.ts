import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MeasuredVariable } from "../../entities/MeasuredVariable";
import { FieldError } from "../shared/FieldError";
import { MeasuredVariableInput } from "./measuredvariable-input";

@ObjectType()
class MeasuredVariableResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => MeasuredVariable, { nullable: true })
  measuredvariable?: MeasuredVariable;
}

@ObjectType()
class PaginatedMeasuredvariable {
  @Field(() => [MeasuredVariable])
  allMeasuredvariables: MeasuredVariable[];
  @Field()
  hasMore: boolean;
}


@Resolver()
export class MeasuredVariableResolver {

  @Query(() => PaginatedMeasuredvariable)
  async allMeasuredvariables(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedMeasuredvariable> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));;
    }

    const allMeasuredvariables = await getConnection().query(
      `
      select p.*
      from measured_variable p
      ${cursor ? `where p."createdDate" < $2` : ""}
      order by p."createdDate" DESC
      limit $1
    `,
      replacements
    );

    return {
      allMeasuredvariables: allMeasuredvariables.slice(0, realLimit),
      hasMore: allMeasuredvariables.length === reaLimitPlusOne,
    };
  }



  @Query(() => MeasuredVariable, { nullable: true })
  measuredvariable(@Arg("id", () => Int) id: number): Promise<MeasuredVariable | undefined> {
    return MeasuredVariable.findOne(id);
  }

  @Mutation(() => MeasuredVariableResponse)
  async createMeasuredvariable(
    @Arg("input") input: MeasuredVariableInput
  ): Promise<MeasuredVariableResponse> {
    let measuredvariable;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(MeasuredVariable)
        .values({
          measuredvariable: input.measuredvariable,
          measuredvariableletter: input.measuredvariableletter,
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      measuredvariable = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "measuredvariable",
              message: "measured variable already taken",
            },
          ],
        };
      }
    }

    return { measuredvariable };
  }

  @Mutation(() => MeasuredVariable, { nullable: true })
  async updateMeasuredvariable(
    @Arg("id", () => Int) id: number,
    @Arg("measuredvariable") measuredvariable: string,
    @Arg("measuredvariableletter") measuredvariableletter: string,
    @Arg("description") description: string,
    @Arg("note") note: string
  ): Promise<MeasuredVariable | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(MeasuredVariable)
      .set({ measuredvariable, measuredvariableletter, description, note })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteMeasuredvariable(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    await MeasuredVariable.delete({ id });
    return true;
  }
}
