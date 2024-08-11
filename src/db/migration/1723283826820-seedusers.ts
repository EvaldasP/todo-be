import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedUsers1687953289337 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const saltRounds = 10;

    const hashedPassword1 = await bcrypt.hash('password1', saltRounds);
    const hashedPassword2 = await bcrypt.hash('password2', saltRounds);

    await queryRunner.query(
      `INSERT INTO user (username, password) VALUES ('alice', $1)`,
      [hashedPassword1],
    );
    await queryRunner.query(
      `INSERT INTO user (username, password) VALUES ('bob', $1)`,
      [hashedPassword2],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM user WHERE username IN ('alice', 'bob')`,
    );
  }
}
