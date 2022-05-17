import { Request, Response } from 'express';
import CreateCompany from '../services/CreateCompany';
import ListCompany from '../services/ListCompanies';
import UpdateCompany from '../services/UpdateCompany';

export default class CompanysController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCompanies = new ListCompany();

    const products = await listCompanies.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCompany = new CreateCompany();

    const product = await createCompany.execute({
      name,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { idCompany } = request.params;

    const updateCompany = new UpdateCompany();

    const product = await updateCompany.execute({
      id: idCompany,
      name,
    });

    return response.json(product);
  }
}
