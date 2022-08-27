import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql'
import newrelic from 'newrelic'

export const newrelicGraphqlMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn
) => {
  const value = await next()
  console.log(ctx)
  // newrelic.setTransactionName(info.fieldName)
  return value
}
