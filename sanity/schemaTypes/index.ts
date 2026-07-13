import { season } from './season'
import { person } from './person'
import { story } from './story'
import { page } from './page'
import { matchResult } from './matchResult'

// Document types + the reusable `matchResult` object embedded in season.results.
export const schemaTypes = [season, person, story, page, matchResult]
