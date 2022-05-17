import { getCustomRepository } from 'typeorm';
import Person from '../typeorm/entities/Person';
import PersonRepository from '../typeorm/repositories/PersonRepository';

class ListPeopleService {
  public async execute(): Promise<Person[]> {
    const personRepository = getCustomRepository(PersonRepository);

    const people = await personRepository.find({
      relations: ['company', 'contacts'],
    });

    return people;
  }
}

export default ListPeopleService;
