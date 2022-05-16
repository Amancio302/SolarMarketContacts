import { Router } from 'express';
import CompanyController from '../controllers/CompanyController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new CompanyController();

productsRouter.get('/', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  productsController.create,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  productsController.update,
);

export default productsRouter;
