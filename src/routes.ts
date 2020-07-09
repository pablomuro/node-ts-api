import { Router, Request, Response} from 'express';
import UserController from './controllers/UserController'
import ProductController from './controllers/ProductController'
import { ApiResponse } from './utils/ApiResponse';
import { AuthMiddleware } from './utils/AuthMiddleware';

const routes = Router();

routes.post('/register', UserController.create);
routes.post('/login', UserController.login);

routes.get('/products', AuthMiddleware.authValidation, ProductController.list);
routes.post('/product', AuthMiddleware.authValidation, ProductController.create);
routes.put('/product/:uuid', AuthMiddleware.authValidation, ProductController.update);
routes.delete('/product/:uuid', AuthMiddleware.authValidation, ProductController.delete);

routes.use('*', (req : Request, res : Response) => {
    return res.status(404).json(ApiResponse.error("API endpoint doesn't exist", {}));
});

export default routes;