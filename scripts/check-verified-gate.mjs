/**
 * Verified-gate proof — runs against the `test` dataset ONLY (D-1.02-5).
 *
 * Creates two season documents in `test` (one verified, one not), runs the REAL
 * exported query from lib/sanity/queries.ts, and asserts that only the verified
 * one is returned. Deletes both documents afterwards. Exits non-zero on any
 * failure. No document is ever written to `production`.
 *
 * Run with: npm run check:gate  (loads .env.local via node --env-file)
 *
 * Write access: uses SANITY_API_WRITE_TOKEN if set, otherwise falls back to the
 * local Sanity CLI session (`npx sanity login`). The app's read token is
 * Viewer-only and cannot write, by design — so this proof does not use it.
 */
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createClient } from '@sanity/client'
import { ALL_SEASONS_QUERY } from '../lib/sanity/queries.ts'

const DATASET = 'test' // hard-coded — this script must never touch production
const GATE_SOURCE = '__gate-proof__' // marker so we only ever clean up our own docs
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const apiVersion = '2026-01-01'

function resolveWriteToken() {
  if (process.env.SANITY_API_WRITE_TOKEN) return process.env.SANITY_API_WRITE_TOKEN
  const cfgPath = path.join(os.homedir(), '.config', 'sanity', 'config.json')
  if (fs.existsSync(cfgPath)) {
    const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
    if (cfg.authToken) return cfg.authToken
  }
  throw new Error(
    'No write token available. Set SANITY_API_WRITE_TOKEN or run `npx sanity login`.',
  )
}

if (!projectId) {
  console.error('FAIL: NEXT_PUBLIC_SANITY_PROJECT_ID is not set (expected via .env.local).')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset: DATASET,
  apiVersion,
  token: resolveWriteToken(),
  useCdn: false, // strongly-consistent reads so the just-created docs are visible
  perspective: 'published',
})

const stamp = Date.now()
let failure = null

async function cleanup() {
  await client.delete({ query: `*[_type == "season" && source == "${GATE_SOURCE}"]` })
}

try {
  console.log(`[gate] dataset=${DATASET} project=${projectId}`)

  // Start clean (in case a previous run was interrupted before cleanup).
  await cleanup()

  const verified = await client.create({
    _type: 'season',
    label: `ГЕЈТ ТЕСТ — проверено ${stamp}`,
    startYear: 1901,
    slug: { _type: 'slug', current: `gate-verified-${stamp}` },
    source: GATE_SOURCE,
    verified: true,
  })
  const unverified = await client.create({
    _type: 'season',
    label: `ГЕЈТ ТЕСТ — непроверено ${stamp}`,
    startYear: 1902,
    slug: { _type: 'slug', current: `gate-unverified-${stamp}` },
    source: GATE_SOURCE,
    verified: false,
  })
  console.log(`[gate] created: verified=${verified._id}  unverified=${unverified._id}`)

  // Run the REAL exported query.
  const results = await client.fetch(ALL_SEASONS_QUERY)
  const ids = results.map((r) => r._id)
  console.log(`[gate] ALL_SEASONS_QUERY returned ${results.length} document(s): ${ids.join(', ')}`)

  // Assertions.
  if (results.length !== 1) {
    throw new Error(`expected exactly 1 document, got ${results.length}`)
  }
  if (results[0]._id !== verified._id) {
    throw new Error(`returned document ${results[0]._id} is not the verified one (${verified._id})`)
  }
  if (ids.includes(unverified._id)) {
    throw new Error(`unverified document ${unverified._id} leaked through the gate`)
  }

  console.log('[gate] PASS — only the verified document is visible; the unverified one is hidden.')
} catch (err) {
  failure = err
  console.error(`[gate] FAIL — ${err.message}`)
} finally {
  try {
    await cleanup()
    console.log('[gate] cleanup: both test documents deleted.')
  } catch (cleanupErr) {
    console.error(`[gate] cleanup error: ${cleanupErr.message}`)
    if (!failure) failure = cleanupErr
  }
}

process.exit(failure ? 1 : 0)
