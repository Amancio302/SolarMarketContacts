import Contact_MarkerRepository from '@modules/contact_marker/typeorm/repositories/Contact_MarkerRepository';
import PersonsRepository from '@modules/person/typeorm/repositories/PersonRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

interface ICreateContact {
  value: string;
  person: number;
  contact_marker: number;
}

class CreateContactService {
  public async execute({
    value,
    person,
    contact_marker,
  }: ICreateContact): Promise<Contact> {
    const contactRepository = getCustomRepository(ContactRepository);
    const contact_markerRepository = getCustomRepository(
      Contact_MarkerRepository,
    );
    const personRepository = getCustomRepository(PersonsRepository);

    const existsPerson = await personRepository.findOne(person);

    if (!existsPerson) {
      throw new AppError('No such person!');
    }

    const existsMarker = await contact_markerRepository.findOne(contact_marker);

    if (!existsMarker) {
      throw new AppError('No such contact marker!');
    }

    const contact = contactRepository.create({
      value,
      person: existsPerson,
      contact_marker: existsMarker,
    });

    await contactRepository.save(contact);

    return contact;
  }
}

export default CreateContactService;
