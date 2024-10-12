import { DataSourceOptions, LogLevel } from "typeorm"

export const dbEntityId = () => {
    const typeDatabase = (process.env.DATABASE_TYPE as any) || "sqlite";
    if (typeDatabase == "postgres") {
        return { type: "uuid", default: "gen_random_uuid()" }
    }
    return { type: "varchar(40)" }
}

const toLogLevels=(option:string):LogLevel[]=>{
    if(option==null){
        return ["migration"]
    }
    const levels = option.split(",")
    return levels as LogLevel[]
}

export const parseConfig = (): DataSourceOptions => {
    const typeDatabase = (process.env.DATABASE_TYPE as any) || "sqlite";
    if (typeDatabase == "sqlite") {
        return {
            type: "sqlite",
            database: process.env.DATABASE_NAME || "./local/local.db",
            migrationsTableName: "migrations",
            entities: [
                "dist/**/*.entity{.ts,.js}"
            ],
            migrations: [
                "dist/migrations/*{.ts,.js}"
            ],
            logging: toLogLevels(process.env.DATABASE_LOG)
        }
    }
    const config: DataSourceOptions = {
        type: typeDatabase,
        host: process.env.DATABASE_HOST || "localhost",
        port: parseInt(process.env.DATABASE_PORT || typeDatabase == "postgres" ? "5432" : "3306", 10),
        username: process.env.DATABASE_USER || "root",
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        migrationsTableName: "migrations",
        entities: [
            "dist/**/*.entity{.ts,.js}"
        ],
        migrations: [
            "dist/migrations/*{.ts,.js}"
        ],
        logging: toLogLevels(process.env.DATABASE_LOG)
    }
    return config;
}