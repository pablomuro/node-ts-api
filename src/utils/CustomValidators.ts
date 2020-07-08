import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";
import { User } from '../models/User';

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: { 
                async validate(userEmail: any, args: ValidationArguments) : Promise<boolean> {
                    const user : User | undefined = await User.findOne({email: userEmail});
                    if (user) return false;
                    return true;
                }
            }
        });
   };
}