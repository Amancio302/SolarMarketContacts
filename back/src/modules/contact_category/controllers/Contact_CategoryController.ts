import { Request, Response } from 'express';
import CreateContact_Category from '../services/CreateContact_Category';
import ListContact_Category from '../services/ListContact_Category';

export default class Contact_CategorysController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContact_Categories = new ListContact_Category();

    const products = await listContact_Categories.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, tag } = request.body;

    const createContact_Category = new CreateContact_Category();

    const product = await createContact_Category.execute({
      name,
      tag,
    });

    return response.json(product);
  }
}
