import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Application } from "./application";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  category: string;

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];

}
