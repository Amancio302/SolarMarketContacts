import { getCustomRepository } from 'typeorm';
import Company from '../typeorm/entities/Company';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

interface ICreateCompany {
  name: string;
}

class CreateCompanyService {
  public async execute({ name }: ICreateCompany): Promise<Company> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const company = companyRepository.create({ name });

    await companyRepository.save(company);

    return company;
  }
}

export default CreateCompanyService;
