import { EntityRepository, Repository } from 'typeorm';
import Contact_Category from '../entities/Contact_Category';

@EntityRepository(Contact_Category)
class Contact_CategorysRepository extends Repository<Contact_Category> {
  public async findByTag(tag: string): Promise<Contact_Category | undefined> {
    const contact_category = await this.findOne({
      where: {
        tag,
      },
    });

    return contact_category;
  }
}

export default Contact_CategorysRepository;
