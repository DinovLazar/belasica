import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

/**
 * FK Belasica — Sanity Studio configuration.
 * Points at the private `production` dataset of project `belasica` (f8rmnfry).
 */
export default defineConfig({
  name: 'default',
  title: 'ФК Беласица — архива',
  projectId: 'f8rmnfry',
  dataset: 'production',
  plugins: [structureTool(), visionTool({ defaultApiVersion: '2026-01-01' })],
  schema: {
    types: schemaTypes,
  },
})
