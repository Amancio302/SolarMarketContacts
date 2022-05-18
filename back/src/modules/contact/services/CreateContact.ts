import ContactMarkerRepository from '@modules/contactMarker/typeorm/repositories/ContactMarkerRepository';
import PersonsRepository from '@modules/person/typeorm/repositories/PersonRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

interface ICreateContact {
  value: string;
  person: number;
  contactMarker: number;
}

class CreateContactService {
  public async execute({
    value,
    person,
    contactMarker,
  }: ICreateContact): Promise<Contact> {
    const contactRepository = getCustomRepository(ContactRepository);
    const contactMarkerRepository = getCustomRepository(
      ContactMarkerRepository,
    );
    const personRepository = getCustomRepository(PersonsRepository);

    const existsPerson = await personRepository.findOne(person);

    if (!existsPerson) {
      throw new AppError('No such person!');
    }

    const existsMarker = await contactMarkerRepository.findOne(contactMarker);

    if (!existsMarker) {
      throw new AppError('No such contact marker!');
    }

    const contact = contactRepository.create({
      value,
      person: existsPerson,
      contactMarker: existsMarker,
    });

    await contactRepository.save(contact);

    return contact;
  }
}

export default CreateContactService;
