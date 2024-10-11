import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    "type": "sqlite",
    "database": "local.db",
    "migrationsTableName": "migrations",
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    migrations: [
        "dist/migrations/*{.ts,.js}"
    ]
}); 

export default AppDataSource