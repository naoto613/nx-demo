import { Plugin } from '@nestjs/apollo';
import { GraphQLSchemaHost } from '@nestjs/graphql';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener> {
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation({ request, document }) {
        if (process.env.NODE_ENV === 'test') {
          return;
        }

        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        const allowedComplexity = 20;
        if (complexity >= allowedComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${allowedComplexity}`,
          );
        }
        console.log('Query Complexity:', complexity);
      },
    };
  }
}
