import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "../env/index.js";

const adapter = new PrismaBetterSqlite3({
  url: env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

export default prisma;
