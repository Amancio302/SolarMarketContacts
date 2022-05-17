import Contact_Category from '../../../contact_category/typeorm/entities/Contact_Category';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Unique(['tag', 'contact_category'])
@Entity('contact_marker')
class Contact_Marker {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  tag: string;

  @ManyToOne(() => Contact_Category, { eager: true })
  @JoinColumn({ name: 'contact_category' })
  contact_category: Contact_Category;
}

export default Contact_Marker;
