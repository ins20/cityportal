import {
  CreateDateColumn,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Category } from "./category";
@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ default: "Новая" })
  status: "Решена" | "Отклонена";

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(() => Category, (category) => category.applications, {
    onDelete: "CASCADE",
    nullable: false,
  })
  category: Category;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ nullable: false })
  imageBefore: string;

  @Column({ default: "" })
  imageAfter: string;
}
