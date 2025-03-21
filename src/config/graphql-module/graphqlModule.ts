/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export default {
  driver: ApolloDriver,
  playground: true,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  sortSchema: true,
  installSubscriptionHandlers: true,
  context: (context: any) => {
    if (context?.extra?.request) {
      return {
        req: {
          ...context?.extra?.request,
          headers: {
            ...context?.extra?.request?.headers,
            ...context?.connectionParams,
          },
        },
      };
    }

    return { req: context?.req };
  },
  subscriptions: {
    'graphql-ws': true,
  },
} as ApolloDriverConfig;
