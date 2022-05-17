import { Request, Response } from 'express';
import CreatePerson from '../services/CreatePerson';
import DeletePerson from '../services/DeletePerson';
import ListPeople from '../services/ListPeople';
import ShowPerson from '../services/ShowPerson';
import UpdatePerson from '../services/UpdatePerson';

export default class PersonsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPeople = new ListPeople();

    const people = await listPeople.execute();

    return response.json(people);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, birth_date, company } = request.body;

    const createPerson = new CreatePerson();

    const person = await createPerson.execute({
      first_name,
      last_name,
      birth_date,
      company,
    });

    return response.json(person);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { idPerson } = request.params;

    const deletePerson = new DeletePerson();

    const person = await deletePerson.execute(idPerson);

    return response.json(person).status(204);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { idPerson } = request.params;

    const showPerson = new ShowPerson();

    const person = await showPerson.execute(idPerson);

    return response.json(person);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { first_name, last_name, birth_date, company } = request.body;
    const { idPerson } = request.params;

    const updatePerson = new UpdatePerson();

    const person = await updatePerson.execute({
      id: idPerson,
      first_name,
      last_name,
      birth_date,
      company,
    });

    return response.json(person);
  }
}
