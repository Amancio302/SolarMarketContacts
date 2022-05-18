import { Router } from 'express';
import ContactMarkerController from '../controllers/ContactMarkerController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ContactMarkerController();

productsRouter.get('/', productsController.index);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      tag: Joi.string().required(),
      contactCategory: Joi.number().required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
