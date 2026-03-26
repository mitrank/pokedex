/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Fetching the first 151 Pokemon
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const { results } = (await response.json()) as {
    results: { name: string; url: string }[];
  };

  console.log(`Fetched ${results.length} Pokemons. Seeding to database...`);

  for (const p of results) {
    // Get details for each individual pokemon to get types and sprites
    const res = await fetch(p.url);
    const details = await res.json();

    const name = details.name;
    const sprite = details.sprites.front_default;
    const types = details.types
      .map((t: { type: { name: string } }) => t.type.name)
      .join(",");

    await prisma.pokemon.upsert({
      where: { name },
      update: {},
      create: {
        name,
        sprite,
        types,
      },
    });
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
