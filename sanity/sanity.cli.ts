import { defineCliConfig } from 'sanity/cli'

/**
 * Studio CLI config. The project ID is not a secret (it is embedded in every
 * Studio URL and API request), so it is hardcoded here rather than read from
 * env — this keeps `sanity dev` / `deploy` reproducible.
 *
 * autoUpdates is off on purpose: this repo pins every dependency to an exact
 * version (CLAUDE.md), and auto-updates would drift the deployed Studio away
 * from the pinned `sanity` version.
 */
export default defineCliConfig({
  api: {
    projectId: 'f8rmnfry',
    dataset: 'production',
  },
  studioHost: 'belasica',
  deployment: {
    appId: 'q93d4lfwpetxz05s17ulprtb',
    autoUpdates: false,
  },
  /**
   * TypeGen: extract this Studio's schema (./schema.json) and generate types for
   * the Next.js data layer's queries into ../lib/sanity/sanity.types.ts. Run via
   * `npm run typegen` at the repo root. `overloadClientMethods` types client.fetch
   * from each defineQuery automatically.
   */
  typegen: {
    path: '../lib/**/*.{ts,tsx}',
    schema: './schema.json',
    generates: '../lib/sanity/sanity.types.ts',
    overloadClientMethods: true,
  },
})
