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

@ObjectType()
@Entity()
export class Department extends BaseEntity {
  @Field(()=> Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Column( )
  department!: string;

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
}
