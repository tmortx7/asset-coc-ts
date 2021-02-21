import { Field, Int, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";
import { Address } from "./Address";

@ObjectType()
@Entity()
export class Site extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field( )
  @Column({ unique: true })
  sitename!: string;

  @Field()
  @Column({ unique: true })
  sitenumber!: string;

  @Field( )
  @Column( )
  description: string;

  @Field( )
  @Column( )
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

  @Field(() => [Address])
  @OneToMany(() => Address, (address) => address.site)
  @TypeormLoader(() => Address, (site: Site) => site.addressIds)
  addresses: Address[];

  @RelationId((site: Site) => site.addresses)
  addressIds: number[];
}
