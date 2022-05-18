import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ContactCategory from '../typeorm/entities/ContactCategory';
import ContactCategoryRepository from '../typeorm/repositories/ContactCategoryRepository';

interface ICreateContactCategory {
  name: string;
  tag: string;
}

class CreateContactCategoryService {
  public async execute({
    tag,
    name,
  }: ICreateContactCategory): Promise<ContactCategory> {
    const contactCategoryRepository = getCustomRepository(
      ContactCategoryRepository,
    );

    const existsTag = await contactCategoryRepository.findByTag(tag);

    if (existsTag) {
      throw new AppError('Contact category tag already exists!');
    }

    const contactCategory = contactCategoryRepository.create({ name, tag });

    await contactCategoryRepository.save(contactCategory);

    return contactCategory;
  }
}

export default CreateContactCategoryService;
