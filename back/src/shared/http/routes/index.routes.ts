import { Router } from 'express';
import companyRouter from '@modules/company/routes/company.routes';
import contactCategoryRouter from '@modules/contactCategory/routes/contactCategory.routes';
import contactMarkerRouter from '@modules/contactMarker/routes/contactMarker.routes';
import personRouter from '@modules/person/routes/person.routes';
import contactRouter from '@modules/contact/routes/contact.routes';

const routes = Router();

routes.use('/company', companyRouter);
routes.use('/contacts/category', contactCategoryRouter);
routes.use('/contacts/marker', contactMarkerRouter);
routes.use('/person', personRouter);
routes.use('/contacts', contactRouter);

export default routes;
