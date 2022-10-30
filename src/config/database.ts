import { Optional } from '../common/types';
const database = () => ({
    sqlite: {
        type: "sqlite",
        database: process.env.SQLITE_DATABASE_NAME,
        entities: [__dirname + './../**/*.entity{.ts,.js}'],
        synchronize: process.env.DATABASE_SYNCHRONIZE,
        dropSchema: true,
    },
    postgres: {
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.POSTGRES_DATABASE_NAME,
        entities: [__dirname + './../modules/**/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
    }
});

export const DatabaseConfig = () => {
    const envCase: Optional<boolean> = global.__TEST__;
    let return_var: any;
    if (envCase) {
        return_var = database().sqlite;
    } else {
        return_var = database().postgres;
    }
    return return_var;
}