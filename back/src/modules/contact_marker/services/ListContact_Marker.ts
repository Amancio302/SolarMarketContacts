import { getCustomRepository } from 'typeorm';
import Contact_Marker from '../typeorm/entities/Contact_Marker';
import Contact_MarkerRepository from '../typeorm/repositories/Contact_MarkerRepository';

class ListContact_MarkerService {
  public async execute(): Promise<Contact_Marker[]> {
    const contact_markerRepository = getCustomRepository(
      Contact_MarkerRepository,
    );

    const contact_markers = await contact_markerRepository.find({
      relations: ['contact_category'],
    });

    return contact_markers;
  }
}

export default ListContact_MarkerService;
