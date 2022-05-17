import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Person from '../typeorm/entities/Person';
import PersonRepository from '../typeorm/repositories/PersonRepository';

class DeletePersonService {
  public async execute(id: string): Promise<Person | undefined> {
    const personRepository = getCustomRepository(PersonRepository);

    const person = await personRepository.findOne(id);

    if (!person) {
      throw new AppError('No such person!');
    }

    personRepository.remove(person);

    return person;
  }
}

export default DeletePersonService;
