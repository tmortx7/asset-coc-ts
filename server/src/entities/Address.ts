import { Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Site } from "./Site";

@ObjectType()
@Entity()
export class Address extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  pluscode: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  note: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Generated("uuid")
  uuid: string;

  @VersionColumn()
  version: number;

  @Field(() => Site)
  @ManyToOne(() => Site, (site) => site.addresses)
  @TypeormLoader(() => Site, (address: Address) => address.siteId)
  site: Site;

  @Field(() => Int)
  @Column()
  @RelationId((address: Address) => address.site)
  siteId: number;
}
