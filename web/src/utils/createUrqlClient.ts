import { cacheExchange, Resolver, Cache} from "@urql/exchange-graphcache";
import Router from "next/router";
import {
  dedupExchange,
  Exchange,
  fetchExchange,
  stringifyVariables,
} from "urql";
import { pipe, tap } from "wonka";
import { DeleteDepartmentMutationVariables,DeleteMeasuredvariableMutationVariables , DeleteInstrumentfunctionMutationVariables} from "../generated/graphql";
import { isServer } from "./isServer";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/login");
      }
    })
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "allDepartments"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "allDepartments") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedDepartments",
      hasMore,
      allDepartments: results,
    };
  };
};


const cursorPagination2 = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "allMeasuredvariables"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "allMeasuredvariables") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedMeasuredvariable",
      hasMore,
      allMeasuredvariables: results,
    };
  };
};

const cursorPagination3 = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "allInstrumentfunctions"
    );
    info.partial = !isItInTheCache;
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "allInstrumentfunctions") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedInstrumentfunction",
      hasMore,
      allInstrumentfunctions: results,
    };
  };
};

function invalidateAllDepartments(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "allDepartments");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allDepartments", fi.arguments || {});
  });
}

function invalidateAllMeasuredvariables(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "allMeasuredvariables");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allMeasuredvariables", fi.arguments || {});
  });
}

function invalidateAllInstrumentfunctions(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "allInstrumentfunctions");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allInstrumentfunctions", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: "http://localhost:4000/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedDepartments: () => null,
          PaginatedMeasuredvariable: () => null,
          PaginatedInstrumentfunction: () => null,

        },
        resolvers: {
          Query: {
            allDepartments: cursorPagination(),
            allMeasuredvariables: cursorPagination2(),
            allInstrumentfunctions: cursorPagination3(),
          },
        },
        updates: {
          Mutation: {
            deleteInstrumentfunction: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "InstrumentFunction",
                id: (args as DeleteInstrumentfunctionMutationVariables).id,
              });
            },
            deleteDepartment: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Department",
                id: (args as DeleteDepartmentMutationVariables).id,
              });
            },
            deleteMeasuredvariable: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "MeasuredVariable",
                id: (args as DeleteMeasuredvariableMutationVariables).id,
              });
            },
             createDepartment: (_result, args, cache, info) => {
              invalidateAllDepartments(cache);
            },
            createMeasuredvariable: (_result, args, cache, info) => {
              invalidateAllMeasuredvariables(cache);
            },
            createInstrumentfunction: (_result, args, cache, info) => {
              invalidateAllInstrumentfunctions(cache);
            },

          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};
