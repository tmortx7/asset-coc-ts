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
import { Site } from "../../entities/Site";
import { FieldError } from "../shared/FieldError";
import { SiteInput } from "./site-input";

@ObjectType()
class SiteResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Site, { nullable: true })
  site?: Site;
}

@ObjectType()
class PaginatedSites {
  @Field(() => [Site])
  allSites: Site[];
  @Field()
  hasMore: boolean;
}

@Resolver(Site)
export class SiteResolver {
  constructor(
    @InjectRepository(Site)
    private readonly siteRespository: Repository<Site>
  ) {}

  @Query(() => PaginatedSites)
  async allSites(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedSites> {
    // 20 -> 21
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;
    const qb = getConnection()
      .getRepository(Site)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);

    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const allSites = await qb.getMany();

    return {
      allSites: allSites.slice(0, realLimit),
      hasMore: allSites.length === reaLimitPlusOne,
    };
  }
  @Query(() => Site, { nullable: true })
  oneSite(@Arg("id", () => Int) id: number): Promise<Site | undefined> {
    return this.siteRespository.findOne(id);
  }
  @Mutation(() => SiteResponse)
  async createSite(@Arg("input") input: SiteInput): Promise<SiteResponse> {
    let site;
    try {
      // User.create({}).save()
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Site)
        .values({
          sitename: input.sitename,
          sitenumber: input.sitenumber,
          description: input.description,
          note: input.note,
        })
        .returning("*")
        .execute();
      site = result.raw[0];
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "sitename",
              message: "site already taken",
            },
          ],
        };
      }
    }

    return { site };
  }

  @Mutation(() => Site, { nullable: true })
  async updateSite(
    @Arg("id", () => Int) id: number,
    @Arg("sitename") sitename: string,
    @Arg("sitenumber") sitenumber: string,
    @Arg("description") description: string,
    @Arg("note") note: string
  ): Promise<Site | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Site)
      .set({ sitename, sitenumber, description, note })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  async deleteSite(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Site.delete({ id });
    return true;
  }
}
