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

  @Field({ description: "City department designation" ,nullable:true})
  @Column({ unique: true })
  department!: string;

  @Field({ description: "City department description" ,nullable: true})
  @Column({ nullable: true })
  description?: string;

  @Field({nullable:true})
  @Column({ nullable: true })
  note?: string;

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
