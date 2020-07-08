import { User } from '../models/User';
import { Product } from '../models/Product';
import {validate, ValidationError} from "class-validator";

export class ValidatorResponse{
  private hasValidationErrors!: boolean;
  private validationErrors?: ValidationError[] | null;

  constructor(hasValidationErrors: boolean, errors: ValidationError[] | null){
    this.hasValidationErrors = hasValidationErrors;
    this.validationErrors = errors;
  }
}

export const Validator = async (obj: User | Product) : Promise<void> => {
  const errors : ValidationError[] = await validate(obj);
  if (errors.length > 0) {
    const validatorResponse: ValidatorResponse = new ValidatorResponse(true, errors) ;
    throw validatorResponse;
  }

};