import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Contact_Marker from '../typeorm/entities/Contact_Marker';
import Contact_MarkerRepository from '../typeorm/repositories/Contact_MarkerRepository';
import Contact_CategoryRepository from '@modules/contact_category/typeorm/repositories/Contact_CategoryRepository';

interface ICreateContact_Marker {
  name: string;
  tag: string;
  contact_category: string;
}

class CreateContact_MarkerService {
  public async execute({
    tag,
    name,
    contact_category,
  }: ICreateContact_Marker): Promise<Contact_Marker> {
    const contact_markerRepository = getCustomRepository(
      Contact_MarkerRepository,
    );
    const contact_categoryRepository = getCustomRepository(
      Contact_CategoryRepository,
    );

    const existsTag = await contact_markerRepository.findByTagAndCategory(
      tag,
      contact_category,
    );

    if (existsTag && existsTag?.contact_category.id === contact_category) {
      throw new AppError('Contact marker tag already exists in this category!');
    }

    const existsCategory = await contact_categoryRepository.findOne(
      contact_category,
    );

    if (!existsCategory) {
      throw new AppError('Contact category do not exists!');
    }

    const contact_marker = contact_markerRepository.create({
      name,
      tag,
      contact_category: existsCategory,
    });

    await contact_markerRepository.save(contact_marker);

    return contact_marker;
  }
}

export default CreateContact_MarkerService;
