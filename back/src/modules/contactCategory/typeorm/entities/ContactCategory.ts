import ContactMarker from '@modules/contactMarker/typeorm/entities/ContactMarker';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contactCategory')
class ContactCategory {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  tag: string;

  @OneToMany(
    () => ContactMarker,
    contactMarker => contactMarker.contactCategory,
  )
  contactMarkers: ContactMarker[];
}

export default ContactCategory;
