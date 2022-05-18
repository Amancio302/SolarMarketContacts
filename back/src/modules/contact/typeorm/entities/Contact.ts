import ContactMarker from '@modules/contactMarker/typeorm/entities/ContactMarker';
import Person from '@modules/person/typeorm/entities/Person';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('contact')
class Contact {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => ContactMarker, { eager: true })
  @JoinColumn({ name: 'contactMarker' })
  contactMarker: ContactMarker;

  @ManyToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'person' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contact;
