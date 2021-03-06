"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1646915028934 = void 0;
class CreateTableUsers1646915028934 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                firstName VARCHAR(255) NOT NULL,
                lastName VARCHAR(255) NOT NULL,
                age INT CHECK (age > 0),
                phone VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
             )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Users
        `);
    }
}
exports.CreateTableUsers1646915028934 = CreateTableUsers1646915028934;
//# sourceMappingURL=1646915028934-CreateTableUsers.js.map