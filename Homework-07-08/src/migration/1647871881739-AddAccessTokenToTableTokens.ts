import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAccessTokenToTableTokens1647871881739 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('Tokens', new TableColumn({
            name: 'accessToken',
            type: 'varchar',
            width: 255,
            isNullable: false,

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Tokens', 'accessToken');
    }
}
