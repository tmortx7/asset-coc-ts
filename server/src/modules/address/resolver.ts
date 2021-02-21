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
import { Address } from "../../entities/Address";
import { FieldError } from "../shared/FieldError";
import { AddressInput } from "./address-input";

@ObjectType()
class AddressResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Address, { nullable: true })
  address?: Address;
}

@ObjectType()
class PaginatedAddresses {
  @Field(() => [Address])
  allAddresses: Address[];
  @Field()
  hasMore: boolean;
}

@Resolver(Address)
export class AddressResolver {
  constructor(
    @InjectRepository(Address)
    private readonly addressRespository: Repository<Address>
  ) {}

  @Query(() => PaginatedAddresses)
  async allAddresses(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedAddresses> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Address)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const allAddresses = await qb.getMany();

    return {
      allAddresses: allAddresses.slice(0, realLimit),
      hasMore: allAddresses.length === reaLimitPlusOne,
    };
  }
  @Query(() => Address, { nullable: true })
  address(@Arg("id", () => Int) id: number): Promise<Address | undefined> {
    return this.addressRespository.findOne(id);
  }
  @Mutation(() => AddressResponse)
  async createAddress(
    @Arg("input") input: AddressInput
  ): Promise<AddressResponse> {
    let address;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Address)
        .values({
          pluscode: input.pluscode,
          siteId: Number(input.siteId),
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      address = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "siteId",
              message: "address for site used",
            },
          ],
        };
      }
    }

    return { address };
  }

  @Mutation(() => Address, { nullable: true })
  async updateAddress(
    @Arg("id", () => Int) id: number,
    @Arg("siteId", () => Int) siteId: number,
    @Arg("pluscode") pluscode: string,
    @Arg("description") description: string,
    @Arg("note") note: string
  ): Promise<Address | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Address)
      .set({ id, siteId, pluscode, description, note })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteAddress(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Address.delete({ id });
    return true;
  }

  @Query(() => Address, { nullable: true })
  oneAddress(@Arg("id", () => Int) id: number): Promise<Address | undefined> {
    return this.addressRespository.findOne(id);
  }
}
