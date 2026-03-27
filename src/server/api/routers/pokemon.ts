import z from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pokemonRouter = createTRPCRouter({
  // Part 1: To access pokemon from DB
  getPokemon: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const pokemon = await ctx.db.pokemon.findUnique({
        where: { name: input.name },
      });
      return pokemon ? { ...pokemon, types: pokemon.types.split(",") } : null;
    }),

  // Part 2: To access all pokemons in the input array
  getPokemonArray: publicProcedure
    .input(z.object({ names: z.array(z.string()) }))
    .query(async ({ ctx, input }) => {
      const pokemonArray = await ctx.db.pokemon.findMany({
        where: {
          name: {
            in: input.names,
          },
        },
      });
      return pokemonArray.map((pokemon) => ({
        ...pokemon,
        types: pokemon.types.split(","),
      }));
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

      const [items, totalCount] = await Promise.all([
        ctx.db.pokemon.findMany({
          where: input.type ? { types: { contains: input.type } } : {},
          take: input.pageSize,
          skip: skip,
          orderBy: { id: "asc" },
        }),
        ctx.db.pokemon.count({
          where: input.type ? { types: { contains: input.type } } : {},
        }),
      ]);

      return {
        items: items.map((p) => ({ ...p, types: p.types.split(",") })),
        totalCount,
      };
    }),
});
