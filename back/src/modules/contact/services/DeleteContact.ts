import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

class DeleteContactService {
  public async execute(id: string): Promise<Contact | undefined> {
    const contactRepository = getCustomRepository(ContactRepository);

    const contact = await contactRepository.findOne(id);

    if (!contact) {
      throw new AppError('No such contact!');
    }

    contactRepository.remove(contact);

    return contact;
  }
}

export default DeleteContactService;
