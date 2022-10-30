import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const GraphQlConfig = () => <ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    debug: true,
    playground: true,
    sortSchema: true,
    definitions: {
        path: join(process.cwd(), 'src/graphql.ts')
    },
    subscriptions: {
        'graphql-ws': true
    },
    context: (ctx) => ctx,
    path: '/graphql',
    buildSchemaOptions: {
        dateScalarMode: 'timestamp',
    }
});