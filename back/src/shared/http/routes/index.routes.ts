import { Router } from 'express';
import companyRouter from '@modules/company/routes/company.routes';
import contact_categoryRouter from '@modules/contact_category/routes/contact_category.routes';
import contact_markerRouter from '@modules/contact_marker/routes/contact_marker.routes';
import personRouter from '@modules/person/routes/person.routes';
import contactRouter from '@modules/contact/routes/contact.routes';

const routes = Router();

routes.use('/company', companyRouter);
routes.use('/contacts/category', contact_categoryRouter);
routes.use('/contacts/marker', contact_markerRouter);
routes.use('/person', personRouter);
routes.use('/contacts', contactRouter);

export default routes;
