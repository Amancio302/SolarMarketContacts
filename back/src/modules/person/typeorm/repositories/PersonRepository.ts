import { EntityRepository, Repository } from 'typeorm';
import Person from '../entities/Person';

@EntityRepository(Person)
class PersonsRepository extends Repository<Person> {
  public async findByName(name: string): Promise<Person | undefined> {
    const person = await this.findOne({
      where: [{ firstName: name }, { lastName: name }],
    });

    return person;
  }
}

export default PersonsRepository;
