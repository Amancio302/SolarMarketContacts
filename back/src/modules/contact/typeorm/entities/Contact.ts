import Contact_Marker from '@modules/contact_marker/typeorm/entities/Contact_Marker';
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

  @ManyToOne(() => Contact_Marker, { eager: true })
  @JoinColumn({ name: 'contact_marker' })
  contact_marker: Contact_Marker;

  @ManyToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'person' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Contact;
