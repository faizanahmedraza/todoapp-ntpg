export const AppConfig = () => ({
    name: process.env.APP_NAEM,
    env: process.env.APP_ENV,
    port: Number(process.env.APP_PORT),
});