import { Request, Response } from 'express';
import CreateContactCategory from '../services/CreateContactCategory';
import ListContactCategory from '../services/ListContactCategory';

export default class ContactCategorysController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContactCategories = new ListContactCategory();

    const products = await listContactCategories.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, tag } = request.body;

    const createContactCategory = new CreateContactCategory();

    const product = await createContactCategory.execute({
      name,
      tag,
    });

    return response.json(product);
  }
}
