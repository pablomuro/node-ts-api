import { Request, Response } from 'express';
import { User } from '../models/User';
import logger from '../utils/logger'
import { Validator } from '../utils/Validator';
import { ApiResponse } from '../utils/ApiResponse';
import { AuthMiddleware } from '../utils/AuthMiddleware';

export class UserController {
  public async index(req : Request, res : Response) : Promise<Response> {
    try {
      const allUsers= await User.find({select: ['uuid', 'name', 'email']})
      const apiResponse = ApiResponse.success(allUsers);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on list users", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
  }

  public async create(req : Request, res : Response) : Promise<Response> {
    try {
      const { name = null, email = null, password = null } = req.body;

      const user = await new User();

      user.name = name;
      user.email = email;
      user.validateUniqueUserEmail = email;
      user.password = password;

      user.isCreate = true;

      await Validator(user);

      await user.hashPassword();
  
      const createdUser = await user.save();

      const apiResponse = ApiResponse.success(createdUser);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse);
      
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on create user", error);
      logger.error(apiResponse);
      return res.status(400).json(apiResponse);
    }
    
  }
  public async delete(req : Request, res : Response) : Promise<Response> {
    try {
      const { uuid = null } = req.body;
      const user = await User.findOneOrFail(uuid);

      await Validator(user);

      const deletedUser = await user.remove();

      const apiResponse = ApiResponse.success(deletedUser);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse);
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on delete user", error);
      logger.error(apiResponse);
      return res.status(400).json(apiResponse);
    }
    
  }

  public async login(req : Request, res : Response) : Promise<Response> {
    try {
      const { name = "login", email = null, password = null } = req.body;

      const userFieldsValidator = await new User();
      userFieldsValidator.name = name;
      userFieldsValidator.email = email;
      userFieldsValidator.password = password;

      await Validator(userFieldsValidator);

      const user = await User.findOneOrFail({where: { email: email } })

      await user.validatePassword(password)

      const authToken = AuthMiddleware.generateToken(user);

      const apiResponse = ApiResponse.success(user);
      apiResponse.auth = {auth: true, authToken: authToken, message:"Login Success"}
      logger.info(apiResponse);
      return res.status(200).json(apiResponse);
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on login user", error);
      logger.error(apiResponse);
      return res.status(400).json(apiResponse);
    }
    
  }

  public async logout(req : Request, res : Response) : Promise<Response> {
    try {
      const { uuid = null } = req.body;
      const user = await User.findOneOrFail(uuid)

      const apiResponse = ApiResponse.success(user);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)

    } catch (error) {
      const apiResponse = ApiResponse.error("Error on logout user", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
    
  }

}

export default new UserController()