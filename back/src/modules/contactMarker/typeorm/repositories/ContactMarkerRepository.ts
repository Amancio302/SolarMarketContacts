import { EntityRepository, Repository } from 'typeorm';
import ContactMarker from '../entities/ContactMarker';

@EntityRepository(ContactMarker)
class ContactMarkersRepository extends Repository<ContactMarker> {
  public async findByTagAndCategory(
    tag: string,
    contactCategory: string,
  ): Promise<ContactMarker | undefined> {
    const contactMarker = await this.findOne({
      where: {
        tag,
        contactCategory,
      },
      relations: ['contactCategory'],
    });

    return contactMarker;
  }
}

export default ContactMarkersRepository;
