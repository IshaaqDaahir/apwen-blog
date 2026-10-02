import Link from 'next/link'
import Image from 'next/image'
import HomeHero from '@/app/components/HomeHero'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostsQuery } from '@/sanity/lib/queries'
import DateComponent from '@/app/components/Date'
import Avatar from '@/app/components/Avatar'
import { urlForImage } from '@/sanity/lib/utils'
import { AllPostsQueryResult } from '@/sanity.types'

function HeroPost({ post }: { post: AllPostsQueryResult[number] }) {
  const imageUrl = post.coverImage ? (urlForImage(post.coverImage)?.url() || post.coverImage.asset?.url) : null

  return (
    <div className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-[1.01]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-brand-100 w-full h-full flex items-center justify-center text-brand-500">No Image</div>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-x-4 text-xs mb-4">
          <time dateTime={post.date} className="text-gray-500">
            <DateComponent dateString={post.date} />
          </time>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4 group-hover:text-brand-600 transition-colors">
          <Link href={`/posts/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h2>
        <p className="text-lg leading-8 text-gray-600 mb-6 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/posts/${post.slug}`}
          className="mb-6 inline-flex items-center text-base font-semibold text-brand-600 hover:text-brand-700 transition-colors relative z-10"
        >
          Read more →
        </Link>
        <div className="relative flex items-center gap-x-4">
          {post.author && (
            <>
              <Avatar person={post.author} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: AllPostsQueryResult[number] }) {
  const imageUrl = post.coverImage ? (urlForImage(post.coverImage)?.url() || post.coverImage.asset?.url) : null

  return (
    <article className="flex max-w-xl flex-col items-start justify-between group">
      <div className="relative w-full aspect-video mb-4 rounded-xl overflow-hidden bg-gray-100 shado-sm">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.coverImage?.alt || post.title}
            fill
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.date} className="text-gray-500">
          <DateComponent dateString={post.date} />
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-brand-600">
          <Link href={`/posts/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
        <Link
          href={`/posts/${post.slug}`}
          className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors relative z-10"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}

export default async function Page() {
  const { data: posts } = await sanityFetch({ query: allPostsQuery })

  const heroPost = posts && posts.length > 0 ? posts[0] : null
  const morePosts = posts && posts.length > 1 ? posts.slice(1) : []

  return (
    <div className="bg-white">
      <HomeHero />
      <div className="py-12 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl">Latest News</h1>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Updates and insights from APWEN.
            </p>
          </div>

          {heroPost && <HeroPost post={heroPost} />}

          {morePosts.length > 0 && (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {morePosts.map((post: AllPostsQueryResult[number]) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {!heroPost && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
              <p className="text-gray-500">Check back soon for updates.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
