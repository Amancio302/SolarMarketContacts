import { Router } from 'express';
import ContactController from '../controllers/ContactController';
import { celebrate, Joi, Segments } from 'celebrate';

const personRouter = Router();
const contactController = new ContactController();

personRouter.get('/', contactController.index);

personRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      value: Joi.string().required(),
      person: Joi.number().required(),
      contact_marker: Joi.number().required(),
    },
  }),
  contactController.create,
);

personRouter.delete(
  '/:idContact',
  celebrate({
    [Segments.PARAMS]: {
      idContact: Joi.number().required(),
    },
  }),
  contactController.delete,
);

personRouter.get(
  '/:idContact',
  celebrate({
    [Segments.PARAMS]: {
      idContact: Joi.number().required(),
    },
  }),
  contactController.show,
);

personRouter.put(
  '/:idContact',
  celebrate({
    [Segments.BODY]: {
      value: Joi.string().required(),
      person: Joi.number().required(),
      contact_marker: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      idContact: Joi.number().required(),
    },
  }),
  contactController.update,
);

export default personRouter;
