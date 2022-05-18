import ContactCategory from '../../../contactCategory/typeorm/entities/ContactCategory';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['tag', 'contactCategory'])
@Entity('contactMarker')
class ContactMarker {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  tag: string;

  @ManyToOne(() => ContactCategory, { eager: true })
  @JoinColumn({ name: 'contactCategory' })
  contactCategory: ContactCategory;
}

export default ContactMarker;
