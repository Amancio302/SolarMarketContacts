import { getCustomRepository } from 'typeorm';
import Person from '../typeorm/entities/Person';
import PersonRepository from '../typeorm/repositories/PersonRepository';

class ShowPersonService {
  public async execute(id: string): Promise<Person | undefined> {
    const personRepository = getCustomRepository(PersonRepository);

    const person = await personRepository.findOne(id);

    return person;
  }
}

export default ShowPersonService;
