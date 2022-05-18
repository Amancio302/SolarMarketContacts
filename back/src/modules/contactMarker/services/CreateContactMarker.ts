import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import ContactMarker from '../typeorm/entities/ContactMarker';
import ContactMarkerRepository from '../typeorm/repositories/ContactMarkerRepository';
import ContactCategoryRepository from '@modules/contactCategory/typeorm/repositories/ContactCategoryRepository';

interface ICreateContactMarker {
  name: string;
  tag: string;
  contactCategory: string;
}

class CreateContactMarkerService {
  public async execute({
    tag,
    name,
    contactCategory,
  }: ICreateContactMarker): Promise<ContactMarker> {
    const contactMarkerRepository = getCustomRepository(
      ContactMarkerRepository,
    );
    const contactCategoryRepository = getCustomRepository(
      ContactCategoryRepository,
    );

    const existsTag = await contactMarkerRepository.findByTagAndCategory(
      tag,
      contactCategory,
    );

    if (existsTag && existsTag?.contactCategory.id === contactCategory) {
      throw new AppError('Contact marker tag already exists in this category!');
    }

    const existsCategory = await contactCategoryRepository.findOne(
      contactCategory,
    );

    if (!existsCategory) {
      throw new AppError('Contact category do not exists!');
    }

    const contactMarker = contactMarkerRepository.create({
      name,
      tag,
      contactCategory: existsCategory,
    });

    await contactMarkerRepository.save(contactMarker);

    return contactMarker;
  }
}

export default CreateContactMarkerService;
