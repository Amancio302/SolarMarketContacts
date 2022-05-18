import CompanyRepository from '@modules/company/typeorm/repositories/CompanyRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Person from '../typeorm/entities/Person';
import PersonRepository from '../typeorm/repositories/PersonRepository';

interface IRequest {
  firstName: string;
  lastName: string;
  birthDate?: Date;
  company?: string;
  id: string;
}

class UpdatePersonService {
  public async execute({
    id,
    firstName,
    lastName,
    birthDate,
    company,
  }: IRequest): Promise<Person> {
    const personRepository = getCustomRepository(PersonRepository);
    const companyRepository = getCustomRepository(CompanyRepository);

    const person = await personRepository.findOne(id);

    if (!person) {
      throw new AppError('Person do not exists!');
    }

    if (person.company.id !== company) {
      const existsCompany = await companyRepository.findOne(company);

      if (!existsCompany) {
        throw new AppError('Company do not exists!');
      }

      person.company = existsCompany;
    }

    person.firstName = firstName;
    person.lastName = lastName;
    person.birthDate = birthDate;

    await personRepository.save(person);

    return person;
  }
}

export default UpdatePersonService;
