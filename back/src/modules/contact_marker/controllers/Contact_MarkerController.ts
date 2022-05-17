import { Request, Response } from 'express';
import CreateContact_Marker from '../services/CreateContact_Marker';
import ListContact_Marker from '../services/ListContact_Marker';

export default class Contact_MarkersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContact_Markers = new ListContact_Marker();

    const contact_markers = await listContact_Markers.execute();

    return response.json(contact_markers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, tag, contact_category } = request.body;

    const createContact_Marker = new CreateContact_Marker();

    const product = await createContact_Marker.execute({
      name,
      tag,
      contact_category,
    });

    return response.json(product);
  }
}
