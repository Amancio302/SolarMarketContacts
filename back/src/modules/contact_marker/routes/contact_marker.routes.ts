import { Router } from 'express';
import Contact_MarkerController from '../controllers/Contact_MarkerController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new Contact_MarkerController();

productsRouter.get('/', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      tag: Joi.string().required(),
      contact_category: Joi.number().required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
