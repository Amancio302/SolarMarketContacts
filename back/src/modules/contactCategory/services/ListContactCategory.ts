import { getCustomRepository } from 'typeorm';
import ContactCategory from '../typeorm/entities/ContactCategory';
import ContactCategoryRepository from '../typeorm/repositories/ContactCategoryRepository';

class ListContactCategoryService {
  public async execute(): Promise<ContactCategory[]> {
    const contactCategoryRepository = getCustomRepository(
      ContactCategoryRepository,
    );

    const contactCategories = await contactCategoryRepository.find({
      relations: ['contactMarkers'],
    });

    return contactCategories;
  }
}

export default ListContactCategoryService;
