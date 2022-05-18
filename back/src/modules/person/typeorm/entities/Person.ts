import Company from '@modules/company/typeorm/entities/Company';
import Contact from '@modules/contact/typeorm/entities/Contact';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('person')
class Person {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('date', {
    nullable: true,
  })
  birthDate?: Date;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company' })
  company: Company;

  @OneToMany(() => Contact, contacts => contacts.person, {
    cascade: true,
  })
  contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Person;
