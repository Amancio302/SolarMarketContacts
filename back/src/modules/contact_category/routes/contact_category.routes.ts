import { Router } from 'express';
import Contact_CategoryController from '../controllers/Contact_CategoryController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new Contact_CategoryController();

productsRouter.get('/', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      tag: Joi.string().required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
