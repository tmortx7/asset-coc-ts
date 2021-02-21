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
import { InstrumentTagPrefix } from "./InstrumentTagPrefix";

@Entity()
@ObjectType()
export class InstrumentFunction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field( )
  @Column({ unique: true })
  instrumentfunction!: string;

  @Field( )
  @Column({ unique: true })
  instrumentfunctionletter!: string;

  @Field( )
  @Column( )
  description: string;

  @Field( )
  @Column( )
  note: string;

  @Field(() => String)
  @Generated("uuid")
  uuid: string;

  @Field(() => String)
  @CreateDateColumn()
  createdDate: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedDate: Date;

  @Field()
  @VersionColumn()
  version: number;

  @Field(() => [InstrumentTagPrefix])
  @OneToMany(
    () => InstrumentTagPrefix,
    (Instrumenttagprefix) => Instrumenttagprefix.instrumentfunction
  )
  @TypeormLoader(
    () => InstrumentTagPrefix,
    (instrumentfunction: InstrumentFunction) =>
      instrumentfunction.instrumenttagprefixIds
  )
  instrumenttagprefixes: InstrumentTagPrefix[];

  @RelationId(
    (instrumentfunction: InstrumentFunction) =>
      instrumentfunction.instrumenttagprefixes
  )
  instrumenttagprefixIds: number[];
}
