import { Request, Response } from 'express';
import CreateContact from '../services/CreateContact';
import DeleteContact from '../services/DeleteContact';
import ListContacts from '../services/ListContacts';
import ShowContact from '../services/ShowContact';
import UpdateContact from '../services/UpdateContact';

export default class ContactsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContacts = new ListContacts();

    const contacts = await listContacts.execute();

    return response.json(contacts);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { value, person, contact_marker } = request.body;

    const createContact = new CreateContact();

    const contact = await createContact.execute({
      value,
      person,
      contact_marker,
    });

    return response.json(contact);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { idContact } = request.params;

    const deleteContact = new DeleteContact();

    const contact = await deleteContact.execute(idContact);

    return response.json(contact).status(204);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { idContact } = request.params;

    const showContact = new ShowContact();

    const contact = await showContact.execute(idContact);

    return response.json(contact);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { value, person, contact_marker } = request.body;
    const { idContact } = request.params;

    const updateContact = new UpdateContact();

    const contact = await updateContact.execute({
      id: idContact,
      value,
      person,
      contact_marker,
    });

    return response.json(contact);
  }
}
