import Link from 'next/link'
import Image from 'next/image'
import { settingsQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  })

  return (
    <header className="fixed z-50 h-24 top-0 left-0 w-full bg-white/80 flex items-center backdrop-blur-lg border-b border-gray-100">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2" href="/">
            <Image
              src="/favicon.ico"
              alt="Logo"
              className="h-10 w-10 object-contain"
              width={40}
              height={40}
            />
            <span className="text-lg sm:text-2xl pl-2 font-bold tracking-tight text-[#701954]">
              {settings?.title || 'APWEN Blog'}
            </span>
          </Link>

          <nav>
            <ul className="flex items-center gap-4 md:gap-6 leading-5 text-sm font-medium text-gray-600">
              <li>
                <Link href="/about" className="hover:text-brand-500 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
