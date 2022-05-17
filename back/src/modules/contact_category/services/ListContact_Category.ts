import { getCustomRepository } from 'typeorm';
import Contact_Category from '../typeorm/entities/Contact_Category';
import Contact_CategoryRepository from '../typeorm/repositories/Contact_CategoryRepository';

class ListContact_CategoryService {
  public async execute(): Promise<Contact_Category[]> {
    const contact_categoryRepository = getCustomRepository(
      Contact_CategoryRepository,
    );

    const contact_categories = await contact_categoryRepository.find({
      relations: ['contact_markers'],
    });

    return contact_categories;
  }
}

export default ListContact_CategoryService;
