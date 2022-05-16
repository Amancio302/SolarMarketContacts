import { Router } from 'express';
import companyRouter from '@modules/company/routes/company.routes';

const routes = Router();

routes.use('/company', companyRouter);

export default routes;
