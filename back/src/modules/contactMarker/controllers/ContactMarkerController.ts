import { Request, Response } from 'express';
import CreateContactMarker from '../services/CreateContactMarker';
import ListContactMarker from '../services/ListContactMarker';

export default class ContactMarkersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContactMarkers = new ListContactMarker();

    const contactMarkers = await listContactMarkers.execute();

    return response.json(contactMarkers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, tag, contactCategory } = request.body;

    const createContactMarker = new CreateContactMarker();

    const product = await createContactMarker.execute({
      name,
      tag,
      contactCategory,
    });

    return response.json(product);
  }
}
