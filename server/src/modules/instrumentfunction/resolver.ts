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
import { InstrumentFunction } from "../../entities/InstrumentFunction";
import { FieldError } from "../shared/FieldError";
import { InstrumentFunctionInput } from "./instrumentfunction-input";

@ObjectType()
class InstrumentFunctionResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => InstrumentFunction, { nullable: true })
  instrumentfunction?: InstrumentFunction;
}

@ObjectType()
class PaginatedInstrumentfunction {
  @Field(() => [InstrumentFunction])
  allInstrumentfunctions: InstrumentFunction[];
  @Field()
  hasMore: boolean;
}


@Resolver()
export class InstrumentFunctionResolver {

  @Query(() => PaginatedInstrumentfunction)
  async allInstrumentfunctions(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedInstrumentfunction> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));;
    }

    const allInstrumentfunctions = await getConnection().query(
      `
      select p.*
      from instrument_function p
      ${cursor ? `where p."createdDate" < $2` : ""}
      order by p."createdDate" DESC
      limit $1
    `,
      replacements
    );

    return {
      allInstrumentfunctions: allInstrumentfunctions.slice(0, realLimit),
      hasMore: allInstrumentfunctions.length === reaLimitPlusOne,
    };
  }



  @Query(() => InstrumentFunction, { nullable: true })
  instrumentfunction(@Arg("id", () => Int) id: number): Promise<InstrumentFunction | undefined> {
    return InstrumentFunction.findOne(id);
  }

  @Mutation(() => InstrumentFunctionResponse)
  async createInstrumentfunction(
    @Arg("input") input: InstrumentFunctionInput
  ): Promise<InstrumentFunctionResponse> {
    let instrumentfunction;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(InstrumentFunction)
        .values({
          instrumentfunction: input.instrumentfunction,
          instrumentfunctionletter: input.instrumentfunctionletter,
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      instrumentfunction = result.raw[1];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "instrumentfunctionletter",
              message: "instrument function abbr already taken",
            },
          ],
        };
      }
    }

    return { instrumentfunction };
  }

  @Mutation(() => InstrumentFunction, { nullable: true })
  async updateInstrumentfunction(
    @Arg("id", () => Int) id: number,
    @Arg("instrumentfunction") instrumentfunction: string,
    @Arg("instrumentfunctionletter") instrumentfunctionletter: string,
    @Arg("description") description: string,
    @Arg("note") note: string
  ): Promise<InstrumentFunction | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(InstrumentFunction)
      .set({ instrumentfunction, instrumentfunctionletter, description, note })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteInstrumentfunction(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    await InstrumentFunction.delete({ id });
    return true;
  }
}
