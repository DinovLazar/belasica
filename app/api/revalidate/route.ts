import { revalidateTag } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

/**
 * Sanity → Next.js revalidation webhook.
 *
 * Verifies the request signature against SANITY_REVALIDATE_SECRET (rejecting
 * anything unsigned or wrongly-signed with 401), then revalidates the cache
 * tags carried in the payload. The Sanity webhook projects `_type` and `slug`;
 * we revalidate `<type>` and `<type>:<slug>`, matching the tags attached to
 * every fetch in lib/sanity/queries.ts. Static-first, no rebuild (D-1.02-3).
 */
type WebhookPayload = {
  _type?: string
  slug?: string
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad request: payload missing _type', { status: 400 })
    }

    const tags = [body._type]
    if (body.slug) {
      tags.push(`${body._type}:${body.slug}`)
    }
    // `{ expire: 0 }` — immediate expiration, the documented pattern for an
    // external webhook that needs edited content to appear right away
    // (Next.js 16 revalidateTag now requires a profile as the 2nd argument).
    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 })
    }

    return NextResponse.json({ revalidated: true, tags })
  } catch (err) {
    console.error('Revalidation webhook error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
