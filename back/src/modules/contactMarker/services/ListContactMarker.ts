import { getCustomRepository } from 'typeorm';
import ContactMarker from '../typeorm/entities/ContactMarker';
import ContactMarkerRepository from '../typeorm/repositories/ContactMarkerRepository';

class ListContactMarkerService {
  public async execute(): Promise<ContactMarker[]> {
    const contactMarkerRepository = getCustomRepository(
      ContactMarkerRepository,
    );

    const contactMarkers = await contactMarkerRepository.find({
      relations: ['contactCategory'],
    });

    return contactMarkers;
  }
}

export default ListContactMarkerService;
