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
} from "typeorm";
import { InstrumentFunction } from "./InstrumentFunction";
import { MeasuredVariable } from "./MeasuredVariable";

@ObjectType()
@Entity()
export class InstrumentTagPrefix extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  tagprefix: string;

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

  @Field(() => InstrumentFunction)
  @ManyToOne(
    () => InstrumentFunction,
    (instrumentfunction) => instrumentfunction.instrumenttagprefixes
  )
  @TypeormLoader(
    () => InstrumentFunction,
    (instrumenttagprefix: InstrumentTagPrefix) =>
      instrumenttagprefix.instrumentfunctionId
  )
  instrumentfunction: InstrumentFunction;
  @Field(() => Int)
  @Column()
  @RelationId(
    (instrumenttagprefix: InstrumentTagPrefix) =>
      instrumenttagprefix.instrumentfunction
  )
  instrumentfunctionId: number;

  @Field(() => MeasuredVariable)
  @ManyToOne(
    () => MeasuredVariable,
    (measuredvariable) => measuredvariable.instrumenttagprefixes
  )
  @TypeormLoader(
    () => MeasuredVariable,
    (instrumenttagprefix: InstrumentTagPrefix) =>
      instrumenttagprefix.measuredvariableId
  )
  measuredvariable: MeasuredVariable;
  @Field(() => Int)
  @Column()
  @RelationId(
    (instrumenttagprefix: InstrumentTagPrefix) =>
      instrumenttagprefix.measuredvariable
  )
  measuredvariableId: number;
}
