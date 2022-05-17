import { EntityRepository, Repository } from 'typeorm';
import Contact_Marker from '../entities/Contact_Marker';

@EntityRepository(Contact_Marker)
class Contact_MarkersRepository extends Repository<Contact_Marker> {
  public async findByTagAndCategory(
    tag: string,
    contact_category: string,
  ): Promise<Contact_Marker | undefined> {
    const contact_marker = await this.findOne({
      where: {
        tag,
        contact_category,
      },
      relations: ['contact_category'],
    });

    return contact_marker;
  }
}

export default Contact_MarkersRepository;
