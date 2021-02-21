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
import { InstrumentTagPrefix } from "../../entities/InstrumentTagPrefix";
import { FieldError } from "../shared/FieldError";
import { InstrumentTagPrefixInput } from "./instrumenttagprefix-input";

@ObjectType()
class InstrumentTagPrefixResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => InstrumentTagPrefix, { nullable: true })
  tagprefix?: InstrumentTagPrefix;
}

@ObjectType()
class PaginatedInstrumentTagprefix {
  @Field(() => [InstrumentTagPrefix])
  instrumentTagprefixes: InstrumentTagPrefix[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class InstrumentTagPrefixResolver {
  @Query(() => PaginatedInstrumentTagprefix)
  async instrumentTagprefixes(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedInstrumentTagprefix> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const instrumentTagprefixes = await getConnection().query(
      `
      select p.*
      from instrument_tag_prefix p
      ${cursor ? `where p."createdAt" < $2` : ""}
      order by p."createdAt" DESC
      limit $1
    `,
      replacements
    );

    return {
      instrumentTagprefixes: instrumentTagprefixes.slice(0, realLimit),
      hasMore: instrumentTagprefixes.length === reaLimitPlusOne,
    };
  }

  @Mutation(() => InstrumentTagPrefixResponse)
  async createInstrumentTagprefix(
    @Arg("input") input: InstrumentTagPrefixInput
  ): Promise<InstrumentTagPrefixResponse> {
    let tagprefix;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(InstrumentTagPrefix)
        .values({
          tagprefix: input.tagprefix,
          measuredvariableId: input.measuredvariableId,
          instrumentfunctionId: input.instrumentfunctionId,
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      tagprefix = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "tagprefix",
              message: "tagprefix already used",
            },
          ],
        };
      }
    }

    return { tagprefix };
  }

  @Mutation(() => InstrumentTagPrefix, { nullable: true })
  async updateInstrumenttagprefix(
    @Arg("id", () => Int) id: number,
    @Arg("tagprefix") tagprefix: string,
    @Arg("instrumentfunctionId", () => Int) instrumentfunctionId: number,
    @Arg("measuredvariableId", () => Int) measuredvariableId: number,
    @Arg("description") description: string,
    @Arg("note") note: string
  ): Promise<InstrumentTagPrefix | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(InstrumentTagPrefix)
      .set({
        tagprefix,
        instrumentfunctionId,
        measuredvariableId,
        description,
        note,
      })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteInstrumenttagprefix(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    await InstrumentTagPrefix.delete({ id });
    return true;
  }

  @Query(() => [InstrumentTagPrefix])
  async allInstrumentTagprefixes(): Promise<InstrumentTagPrefix[]> {
    return InstrumentTagPrefix.find();
  }

  @Query(() => InstrumentTagPrefix, { nullable: true })
  oneInstrumentTagprefix(
    @Arg("id", () => Int) id: number
  ): Promise<InstrumentTagPrefix | undefined> {
    return InstrumentTagPrefix.findOne(id);
  }
}
