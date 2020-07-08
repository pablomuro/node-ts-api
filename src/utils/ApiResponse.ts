import { ValidatorResponse } from "./Validator";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { classToClass } from "class-transformer";
import { AuthResponse } from "./AuthMiddleware";

export class ApiResponse{
  public success!: boolean;
  public message!: string;
  public code!: number;
  public auth?: AuthResponse;
  public data!: Array<User> | Array<Product> | User | Product | AuthResponse | null;
  public error!: ValidatorResponse | any | null;

  constructor(success: boolean, message: string, code: number, data: Array<User> | Array<Product> | User | Product | AuthResponse | null,  error: ValidatorResponse | any | null){
    this.success = success;
    this.message = message;
    this.code = code;
    this.data = data;
    this.error = error;
  }

  public static error(message: string, errorsResponse: ValidatorResponse | any){
    if( ! (errorsResponse instanceof ValidatorResponse )){
      errorsResponse = new ValidatorResponse(true, errorsResponse)
    }
    return new ApiResponse(false, message, 400, null, errorsResponse)
  }

  public static success(data: Array<User> | Array<Product> | User | Product | AuthResponse | null, message?: string){
    const successMessage = (message) ? message : 'Success';
    return new ApiResponse(true, successMessage, 200, classToClass(data), null)
  }
}