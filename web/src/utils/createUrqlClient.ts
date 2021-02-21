import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
  DeleteaddressMutationVariables,
  DeleteDepartmentMutationVariables,
  DeleteInstrumentfunctionMutationVariables,
  DeleteInstrumentTagprefixMutationVariables,
  DeleteMeasuredvariableMutationVariables,
  DeleteSiteMutationVariables,
} from "../generated/graphql";
import {
  cursorPaginationAddresses,
  cursorPaginationDepartments,
  cursorPaginationInstrumentfunctions,
  cursorPaginationInstrumenttagprefixes,
  cursorPaginationMeasuredVariable,
  cursorPaginationSites,
} from "./cursorPagination";
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
function invalidateAddresses(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "allAddresses"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allAddresses", fi.arguments || {});
  });
}


function invalidateInstrumentTagprefixes(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "instrumentTagprefixes"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "instrumentTagprefixes", fi.arguments || {});
  });
}

function invalidateAllDepartments(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "allDepartments"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allDepartments", fi.arguments || {});
  });
}

function invalidateAllMeasuredvariables(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "allMeasuredvariables"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allMeasuredvariables", fi.arguments || {});
  });
}

function invalidateAllInstrumentfunctions(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info) => info.fieldName === "allInstrumentfunctions"
  );
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allInstrumentfunctions", fi.arguments || {});
  });
}

function invalidateAllSites(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "allSites");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "allSites", fi.arguments || {});
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
          PaginatedInstrumentTagprefix: () => null,
          PaginatedSites: () => null,
          PaginatedAddresses: () => null,
        },
        resolvers: {
          Query: {
            allAddresses: cursorPaginationAddresses(),
            allDepartments: cursorPaginationDepartments(),
            allMeasuredvariables: cursorPaginationMeasuredVariable(),
            allInstrumentfunctions: cursorPaginationInstrumentfunctions(),
            instrumentTagprefixes: cursorPaginationInstrumenttagprefixes(),
            allSites: cursorPaginationSites(),
          },
        },
        updates: {
          Mutation: {
            deleteAddress: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Address",
                id: (args as DeleteaddressMutationVariables).id,
              });
            },
            deleteSite: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "Site",
                id: (args as DeleteSiteMutationVariables).id,
              });
            },
            deleteInstrumenttagprefix: (_result, args, cache, info) => {
              cache.invalidate({
                __typename: "InstrumentTagPrefix",
                id: (args as DeleteInstrumentTagprefixMutationVariables).id,
              });
            },
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
            createAddress: (_result, args, cache, info) => {
              invalidateAddresses(cache);
            },
            createSite: (_result, args, cache, info) => {
              invalidateAllSites(cache);
            },
            createInstrumentTagprefix: (_result, args, cache, info) => {
              invalidateInstrumentTagprefixes(cache);
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
