import { Router } from 'express';
import PersonController from '../controllers/PersonController';
import { celebrate, Joi, Segments } from 'celebrate';

const personRouter = Router();
const personController = new PersonController();

personRouter.get('/', personController.index);

personRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      birthDate: Joi.date(),
      company: Joi.number(),
    },
  }),
  personController.create,
);

personRouter.delete(
  '/:idPerson',
  celebrate({
    [Segments.PARAMS]: {
      idPerson: Joi.number().required(),
    },
  }),
  personController.delete,
);

personRouter.get(
  '/:idPerson',
  celebrate({
    [Segments.PARAMS]: {
      idPerson: Joi.number().required(),
    },
  }),
  personController.show,
);

personRouter.put(
  '/:idPerson',
  celebrate({
    [Segments.BODY]: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      birthDate: Joi.date(),
      company: Joi.number(),
    },
    [Segments.PARAMS]: {
      idPerson: Joi.number().required(),
    },
  }),
  personController.update,
);

export default personRouter;
