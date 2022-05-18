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
        name: 'contactMarker',
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
          },
          {
            name: 'contactCategory',
            type: 'int',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'contactMarker',
      new TableForeignKey({
        name: 'MarkerCategory',
        columnNames: ['contactCategory'],
        referencedTableName: 'contactCategory',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contactMarker');
  }
}
