import Contact_Marker from '@modules/contact_marker/typeorm/entities/Contact_Marker';
import Contact_MarkerRepository from '@modules/contact_marker/typeorm/repositories/Contact_MarkerRepository';
import Person from '@modules/person/typeorm/entities/Person';
import PersonsRepository from '@modules/person/typeorm/repositories/PersonRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact from '../typeorm/entities/Contact';
import ContactRepository from '../typeorm/repositories/ContactRepository';

interface ICreateContact {
  value: string;
  person: number;
  contact_marker: number;
  id: string;
}

class CreateContactService {
  public async execute({
    value,
    person,
    contact_marker,
    id,
  }: ICreateContact): Promise<Contact> {
    const contactRepository = getCustomRepository(ContactRepository);
    const contact_markerRepository = getCustomRepository(
      Contact_MarkerRepository,
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

    let existsMarker: Contact_Marker | undefined = contact.contact_marker;

    if (contact.contact_marker.id !== contact_marker) {
      existsMarker = await contact_markerRepository.findOne(contact_marker);

      if (!existsMarker) {
        throw new AppError('No such contact marker!');
      }
    }

    contact.value = value;
    contact.person = existsPerson;
    contact.contact_marker = existsMarker;

    await personRepository.save(contact);

    return contact;
  }
}

export default CreateContactService;
