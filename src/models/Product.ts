import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import {Min, IsInt, IsNotEmpty } from "class-validator";
@Entity()
export class Product extends BaseEntity{

  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @Column()
  @IsNotEmpty()
  description!: string;

  @Column()
  @IsNotEmpty()
  category!: string;

  @Column("numeric", { precision: 2 })
  @IsNotEmpty()
  price!: number;
  
  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(0, {message: "Type a value grather than zero"})
  stock!: number;
}