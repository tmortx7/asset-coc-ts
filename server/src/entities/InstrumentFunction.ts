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
export class InstrumentFunction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({nullable: true})
  @Column({ unique: true })
  instrumentfunction!: string;

  @Field({nullable: true})
  @Column({ unique: true })
  instrumentfunctionletter!: string;

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
