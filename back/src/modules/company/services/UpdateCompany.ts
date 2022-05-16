import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Company from '../typeorm/entities/Company';
import CompanyRepository from '../typeorm/repositories/CompanyRepository';

interface IRequest {
  name: string;
  id: string;
}

class UpdateCompanyService {
  public async execute({ id, name }: IRequest): Promise<Company> {
    const companyRepository = getCustomRepository(CompanyRepository);

    const company = await companyRepository.findOne(id);

    if (!company) {
      throw new AppError('Company do not exists!');
    }

    company.name = name;

    await companyRepository.save(company);

    return company;
  }
}

export default UpdateCompanyService;
