/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient } from "@prisma/client"; // Standard import

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding to Supabase...");

  // Fetching the first 151 Pokemon
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = (await response.json()) as {
    results: { name: string; url: string }[];
  };

  console.log(`Fetched ${data.results.length} Pokemon. Processing details...`);

  for (const p of data.results) {
    const res = await fetch(p.url);
    const details = await res.json();

    const name = details.name;
    const sprite = details.sprites.front_default;

    const types: string[] = details.types.map(
      (t: { type: { name: string } }) => t.type.name,
    );

    await prisma.pokemon.upsert({
      where: { name },
      update: {
        sprite,
        types,
      },
      create: {
        name,
        sprite,
        types,
      },
    });

    console.log(`Seeded: ${name}`);
  }

  console.log("Seeding finished successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
