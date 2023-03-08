import { MigrationInterface, QueryRunner } from "typeorm";

export class alterdataToDateSchedule1678285129268 implements MigrationInterface {
    name = 'alterdataToDateSchedule1678285129268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "data" TO "date"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME COLUMN "date" TO "data"`);
    }

}
