import CompanyRepository from '@modules/company/typeorm/repositories/CompanyRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Person from '../typeorm/entities/Person';
import PersonRepository from '../typeorm/repositories/PersonRepository';

interface ICreatePerson {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  company?: number;
}

class CreatePersonService {
  public async execute({
    firstName,
    lastName,
    birthDate,
    company,
  }: ICreatePerson): Promise<Person> {
    const personRepository = getCustomRepository(PersonRepository);
    const companyRepository = getCustomRepository(CompanyRepository);

    let hasCompany = undefined;

    if (company) {
      hasCompany = await companyRepository.findOne(company);

      if (!hasCompany) {
        throw new AppError('No such company!');
      }
    }

    const person = personRepository.create({
      firstName,
      lastName,
      birthDate,
      company: hasCompany,
    });

    await personRepository.save(person);

    return person;
  }
}

export default CreatePersonService;
