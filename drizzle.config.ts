import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/lib/schema/*",
  dbCredentials: {
    url: "postgresql://postgres:example@127.0.0.1:5432/adoptafin_dev",
    },

  extensionsFilters: ["postgis"],
  schemaFilter: "public",
  tablesFilter: "*",

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  entities: {
    roles: {
      provider: '',
      exclude: [],
      include: []
    }
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});