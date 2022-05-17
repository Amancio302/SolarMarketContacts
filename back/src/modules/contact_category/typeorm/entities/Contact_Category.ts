import Contact_Marker from '@modules/contact_marker/typeorm/entities/Contact_Marker';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_category')
class Contact_Category {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  tag: string;

  @OneToMany(
    () => Contact_Marker,
    contact_marker => contact_marker.contact_category,
  )
  contact_markers: Contact_Marker[];
}

export default Contact_Category;
