import { PrismaClient } from '@prisma/client';
import prismaService from '../prisma-service';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

// モデル名を PrismaClient の Class から取るようにしています。こうするとモデルが増えても勝手に型定義もアップデートされるからです。(先頭に "$" が付いているのが PrismaClient の関数でそれ以外に生えてるプロパティが schema.prisma から生成されたモデルの名前です)
type FilterStartsWith<
  Union,
  Prefix extends string,
> = Union extends `${Prefix}${infer _Property}` ? never : Union;
type ModelName = FilterStartsWith<keyof Awaited<PrismaClient>, '$'>;

/**
 * connect/create が生えてたらinclude できるようにする
 */
function buildPrismaIncludeFromAttrs(attrs: Record<string, any>) {
  const include = Object.keys(attrs).reduce((prev, curr) => {
    const value = attrs[curr];
    const isObject = typeof value === 'object';
    const isRelation =
      isObject &&
      value !== null &&
      Object.keys(value).find((v) => v.match(/connect|create/));

    if (isRelation) {
      prev[curr] = true;
    }

    return prev;
  }, Object.create(null));

  const hasInclude = Object.keys(include).length;
  return hasInclude ? include : undefined;
}

// ここでモデル名とデフォルトの値を渡すと、それに基づいた Factory 関数を返します。
export const createFactory = <CreateInputType, ModelType>(
  modelName: ModelName,
  defaultAttributes: CreateInputType,
) => {
  return {
    create: async (attrs: Partial<CreateInputType>): Promise<ModelType> => {
      const obj: CreateInputType = {
        ...defaultAttributes,
        ...attrs,
      };

      const options: Record<string, any> = {};
      const includes = buildPrismaIncludeFromAttrs(attrs);
      if (includes) options.include = includes;

      return await prismaService[modelName as string].create({
        data: { ...obj },
        ...options,
      });
    },
  };
};
