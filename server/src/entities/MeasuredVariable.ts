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
export class MeasuredVariable extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field( )
  @Column({ unique: true })
  measuredvariable!: string;

  @Field( )
  @Column({ unique: true })
  measuredvariableletter!: string;

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
    (instrumenttagprefix) => instrumenttagprefix.measuredvariable
  )
  @TypeormLoader(
    () => InstrumentTagPrefix,
    (measuredvariable: MeasuredVariable) =>
      measuredvariable.instrumenttagprefixIds
  )
  instrumenttagprefixes: InstrumentTagPrefix[];

  @RelationId(
    (measuredvariable: MeasuredVariable) =>
      measuredvariable.instrumenttagprefixes
  )
  instrumenttagprefixIds: number[];
}
