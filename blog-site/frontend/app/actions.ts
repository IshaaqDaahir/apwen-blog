'use server'

import { draftMode } from 'next/headers'

export async function disableDraftMode() {
  await Promise.allSettled([(await draftMode()).disable()])
}
