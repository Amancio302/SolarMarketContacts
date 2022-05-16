import { EntityRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {
  public async findByName(name: string): Promise<Company | undefined> {
    const contact = await this.findOne({
      where: {
        name,
      },
    });

    return contact;
  }
}

export default CompanyRepository;
