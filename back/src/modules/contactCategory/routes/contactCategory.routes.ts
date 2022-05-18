import { Router } from 'express';
import ContactCategoryController from '../controllers/ContactCategoryController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ContactCategoryController();

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
