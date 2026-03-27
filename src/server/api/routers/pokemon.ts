import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pokemonRouter = createTRPCRouter({
  // Part 1: To access pokemon from DB
  getPokemon: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.pokemon.findUnique({
        where: { name: input.name.toLowerCase().trim() },
      });
    }),

  // Part 2: To access all pokemons in the input array
  getPokemonArray: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const cleanedNames = input.names.map((n) => n.toLowerCase().trim());

      return await ctx.db.pokemon.findMany({
        where: {
          name: {
            in: cleanedNames,
          },
        },
      });
    }),

  // Part 3: To access pokemon by type
  getPokemonType: publicProcedure
    .input(
      z.object({
        type: z.string().optional(),
        page: z.number().default(0),
        pageSize: z.number().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const skip = input.page * input.pageSize;

      const where = input.type
        ? { types: { has: input.type.toLowerCase() } }
        : {};

      const [items, totalCount] = await Promise.all([
        ctx.db.pokemon.findMany({
          where,
          take: input.pageSize,
          skip,
          orderBy: { id: "asc" },
        }),
        ctx.db.pokemon.count({ where }),
      ]);

      return { items, totalCount };
    }),
});
