import { Request, Response } from 'express';
import { Product } from '../models/Product';
import logger from '../utils/logger'
import { ApiResponse } from '../utils/ApiResponse';
import { Validator } from '../utils/Validator';

export class ProductController {
  public async list(req : Request, res : Response) : Promise<Response> {
    try {
      const allProducts= await Product.find()
      const apiResponse = ApiResponse.success(allProducts);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on list products", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
  }

  public async create(req : Request, res : Response) : Promise<Response> {
    try {
      const product = await new Product()

      const { name = null,  description = null, category = null , price = null, stock = null} = req.body;
      
      product.name = name
      product.description = description
      product.category = category
      product.price = parseFloat(price)
      product.stock = parseInt(stock)

      await Validator(product);
  
      const createdProduct = await product.save()

      const apiResponse = ApiResponse.success(createdProduct);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on create product", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
    
  }

  public async update(req : Request, res : Response) : Promise<Response> {
    try {
      const { uuid = null } = req.body;
      const product = await Product.findOneOrFail(uuid)

      const { name = null,  description = null, category = null , price = null, stock = null} = req.body;

      product.name = name
      product.description = description
      product.category = category
      product.price = parseFloat(price)
      product.stock = parseInt(stock)

      await Validator(product);
  
      const savedProduct = await product.save()

      const apiResponse = ApiResponse.success(savedProduct);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)
      
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on update product", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
    
  }

  public async delete(req : Request, res : Response) : Promise<Response> {
    try {
      const { uuid = null } = req.body;
      const product = await Product.findOneOrFail(uuid)

      await Validator(product);

      const deletedProduct = await product.remove();

      const apiResponse = ApiResponse.success(deletedProduct);
      logger.info(apiResponse);
      return res.status(200).json(apiResponse)  
    } catch (error) {
      const apiResponse = ApiResponse.error("Error on delete product", error);
      logger.error(apiResponse)
      return res.status(400).json(apiResponse)
    }
    
  }

}

export default new ProductController()