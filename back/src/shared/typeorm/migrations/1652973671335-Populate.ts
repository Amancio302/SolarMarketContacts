import ContactCategory from '@modules/contactCategory/typeorm/entities/ContactCategory';
import ContactMarker from '@modules/contactMarker/typeorm/entities/ContactMarker';
import { MigrationInterface, QueryRunner } from 'typeorm';

import ContactsSeed from '../seed/ContactsSeed';

export class Populate1652973671335 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saveCategories = [];
    for (const category in ContactsSeed) {
      const { name, tag } = ContactsSeed[category];
      saveCategories.push(
        queryRunner.manager.create<ContactCategory>(ContactCategory, {
          name,
          tag,
        }),
      );
    }
    const categoriesAux = await Promise.all(saveCategories);
    const categories = await queryRunner.manager.save<ContactCategory>(
      categoriesAux,
    );
    const saveMarkers = [];
    for (const category in ContactsSeed) {
      for (const marker in ContactsSeed[category].markers) {
        const { name, tag } = ContactsSeed[category].markers[marker];
        saveMarkers.push(
          queryRunner.manager.create<ContactMarker>(ContactMarker, {
            name,
            tag,
            contactCategory: categories[category],
          }),
        );
      }
    }
    await queryRunner.manager.save<ContactMarker>(saveMarkers);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const idMarkers = await queryRunner.manager.find<ContactMarker>(
      ContactMarker,
    );
    if (idMarkers.length > 0) {
      await queryRunner.manager.delete<ContactMarker>(
        ContactMarker,
        idMarkers.map(marker => marker.id),
      );
    }
    const idCategories = await queryRunner.manager.find<ContactCategory>(
      ContactCategory,
    );
    if (idCategories.length > 0) {
      await queryRunner.manager.delete<ContactCategory>(
        ContactCategory,
        idCategories.map(category => category.id),
      );
    }
  }
}
