import { EntityRepository, Repository } from 'typeorm';
import ContactCategory from '../entities/ContactCategory';

@EntityRepository(ContactCategory)
class ContactCategorysRepository extends Repository<ContactCategory> {
  public async findByTag(tag: string): Promise<ContactCategory | undefined> {
    const contactCategory = await this.findOne({
      where: {
        tag,
      },
    });

    return contactCategory;
  }
}

export default ContactCategorysRepository;
