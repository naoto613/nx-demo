import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
  GraphQLRequestContext,
} from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(
    requestContext: GraphQLRequestContext,
  ): Promise<GraphQLRequestListener> {
    if (process.env.NODE_ENV === 'test') {
      return;
    }

    console.log('Request started');
    const {
      request: { query, operationName, variables },
    } = requestContext;

    return {
      async didEncounterErrors({ errors }) {
        // errors は配列なので JSON 文字列に変換している
        const message = {
          errors: JSON.stringify(errors, null, 2),
        };
        console.error(message);
      },
      async willSendResponse() {
        const message = {
          operationName,
          query,
          variables,
        };
        console.log(message);
      },
    };
  }
}
