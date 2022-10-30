import { QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { join } from 'path';
import { AppConfig } from './app';

export const i18nConfig = () => ({
    fallbackLanguage: 'en',
    loaderOptions: {
        path: join(__dirname, './../i18n/'),
        watch: AppConfig().env == "local" ? true : false,
    },
    resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
    ],
})
