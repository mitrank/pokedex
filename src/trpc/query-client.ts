import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import SuperJSON from "superjson";

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // During this time (5 minutes), tRPC won't even try to re-fetch from the DB.
        staleTime: 5 * 60 * 1000,

        // This doesn't trigger reload on tab switch
        refetchOnWindowFocus: false,

        // How long to keep "unused" data in memory before clearing it
        gcTime: 10 * 60 * 1000,

        // Number of times to retry a failed fetch before showing an error
        retry: 1,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  });
