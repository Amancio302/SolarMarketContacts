import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact_Category from '../typeorm/entities/Contact_Category';
import Contact_CategoryRepository from '../typeorm/repositories/Contact_CategoryRepository';

interface ICreateContact_Category {
  name: string;
  tag: string;
}

class CreateContact_CategoryService {
  public async execute({
    tag,
    name,
  }: ICreateContact_Category): Promise<Contact_Category> {
    const contact_categoryRepository = getCustomRepository(
      Contact_CategoryRepository,
    );

    const existsTag = await contact_categoryRepository.findByTag(tag);

    if (existsTag) {
      throw new AppError('Contact category tag already exists!');
    }

    const contact_category = contact_categoryRepository.create({ name, tag });

    await contact_categoryRepository.save(contact_category);

    return contact_category;
  }
}

export default CreateContact_CategoryService;
