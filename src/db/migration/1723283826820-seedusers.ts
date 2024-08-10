import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1687953289337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO user (username, password) VALUES ('alice', 'password1')`,
    );
    await queryRunner.query(
      `INSERT INTO user (username, password) VALUES ('bob', 'password2')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user WHERE username IN ('alice', 'bob')`,
    );
  }
}
