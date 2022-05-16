import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateContactMarkersTable1652721312078
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contact_marker',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'tag',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'contact_category',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'contact_marker',
      new TableForeignKey({
        name: 'MarkerCategory',
        columnNames: ['contact_category'],
        referencedTableName: 'contact_category',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contact_marker');
  }
}
