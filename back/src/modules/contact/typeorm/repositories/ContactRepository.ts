import { EntityRepository, Repository } from 'typeorm';
import Contact from '../entities/Contact';

@EntityRepository(Contact)
class ContactsRepository extends Repository<Contact> {
  public async findByValue(value: string): Promise<Contact | undefined> {
    const contact = await this.findOne({
      where: {
        value,
      },
    });

    return contact;
  }
}

export default ContactsRepository;
