import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class MeasuredVariable extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  measuredvariable: string;

  @Field()
  @Column({ unique: true })
  measuredvariableletter: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  note?: string;

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
}
