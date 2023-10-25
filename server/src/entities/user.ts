import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Application } from "./application";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fio: string;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, default: "user" })
  role: "user" | "admin";

  @OneToMany(() => Application, (application) => application.user)
  applications: Application[];
}
