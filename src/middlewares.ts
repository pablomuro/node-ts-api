import { Request, Response } from 'express';
import api from './api';

export const languageMiddleware = (req: Request, res: Response, next : any) => {
  req.acceptsLanguages()
  api.language = 'asasasas'
  next()
};