import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

class ListContactsService {
  public async execute(id: string): Promise<Contact | undefined> {
    const contactRepository = getCustomRepository(ContactRepository);

    const contact = await contactRepository.findOne(id);

    return contact;
  }
}

export default ListContactsService;
