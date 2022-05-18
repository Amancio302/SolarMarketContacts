import ContactMarker from '@modules/contactMarker/typeorm/entities/ContactMarker';
import ContactMarkerRepository from '@modules/contactMarker/typeorm/repositories/ContactMarkerRepository';
import Person from '@modules/person/typeorm/entities/Person';
import PersonsRepository from '@modules/person/typeorm/repositories/PersonRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

interface ICreateContact {
  value: string;
  person: number;
  contactMarker: number;
  id: string;
}

class CreateContactService {
  public async execute({
    value,
    person,
    contactMarker,
    id,
  }: ICreateContact): Promise<Contact> {
    const contactRepository = getCustomRepository(ContactRepository);
    const contactMarkerRepository = getCustomRepository(
      ContactMarkerRepository,
    );
    const personRepository = getCustomRepository(PersonsRepository);

    const contact = await contactRepository.findOne(id);

    if (!contact) {
      throw new AppError('No such contact!');
    }

    let existsPerson: Person | undefined = contact.person;

    if (contact.person.id !== person) {
      existsPerson = await personRepository.findOne(person);

      if (!existsPerson) {
        throw new AppError('No such person!');
      }
    }

    let existsMarker: ContactMarker | undefined = contact.contactMarker;

    if (contact.contactMarker.id !== contactMarker) {
      existsMarker = await contactMarkerRepository.findOne(contactMarker);

      if (!existsMarker) {
        throw new AppError('No such contact marker!');
      }
    }

    contact.value = value;
    contact.person = existsPerson;
    contact.contactMarker = existsMarker;

    await personRepository.save(contact);

    return contact;
  }
}

export default CreateContactService;
