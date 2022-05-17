import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

class ListContactsService {
  public async execute(): Promise<Contact[]> {
    const contactRepository = getCustomRepository(ContactRepository);

    const contacts = await contactRepository.find();

    return contacts;
  }
}

export default ListContactsService;
