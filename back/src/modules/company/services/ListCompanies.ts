import { getCustomRepository } from 'typeorm';
import Company from '../typeorm/entities/Company';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

class ListCompanyService {
  public async execute(): Promise<Company[]> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const companies = await companyRepository.find();

    return companies;
  }
}

export default ListCompanyService;
