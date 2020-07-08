import {Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import {IsEmail, IsNotEmpty, MinLength, ValidateIf} from "class-validator";
import {Exclude} from "class-transformer";
import { IsUserAlreadyExist } from "../utils/CustomValidators";
import bcrypt from 'bcrypt'
@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column()
  @IsNotEmpty()
  name!: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail({}, {message: "Type a valid e-mail"})
  email!: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6, {message: "Password must have more than 6 characters"})
  @Exclude()
  public password!: string;


  @ValidateIf(user => user.isCreate === true)
  @Exclude()
  public isCreate?: boolean;

  @ValidateIf(user => user.isCreate === true)
  @IsUserAlreadyExist({message: "User already exist"})
  @Exclude()
  public validateUniqueUserEmail?: string;

  public async hashPassword() : Promise<void>{
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async validatePassword(password: string) : Promise<boolean>{
    const passwordCompare : boolean = await bcrypt.compare(password, this.password)
    if(passwordCompare === false){
      throw {name: "InvalidPassword", message: "Invalid Password"}
    }

    return passwordCompare;
  }

}