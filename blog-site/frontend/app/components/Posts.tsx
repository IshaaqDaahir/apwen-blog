import Link from 'next/link'
import Image from 'next/image'

import { sanityFetch } from '@/sanity/lib/live'
import { morePostsQuery, allPostsQuery } from '@/sanity/lib/queries'
import { AllPostsQueryResult } from '@/sanity.types'
import DateComponent from '@/app/components/Date'
import { dataAttr, urlForImage } from '@/sanity/lib/utils'

const Post = ({ post }: { post: AllPostsQueryResult[number] }) => {
  const { _id, title, slug, excerpt, date, author, coverImage } = post
  const imageUrl = coverImage ? (urlForImage(coverImage)?.url() || coverImage.asset?.url) : null

  return (
    <article
      data-sanity={dataAttr({ id: _id, type: 'post', path: 'title' }).toString()}
      key={_id}
      className="flex flex-col items-start justify-between group"
    >
      <div className="relative w-full mb-4 rounded-xl overflow-hidden bg-gray-100 shadow-sm aspect-[16/9]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={coverImage?.alt || title}
            fill
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={date} className="text-gray-500">
          <DateComponent dateString={date} />
        </time>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-brand-600">
          <Link href={`/posts/${slug}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{excerpt}</p>
        <Link
          href={`/posts/${slug}`}
          className="mt-3 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors relative z-10"
        >
          Read more →
        </Link>
      </div>
      <div className="relative mt-4 flex items-center gap-x-4">
        {author && author.firstName && (
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              {author.firstName} {author.lastName}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

const Posts = ({
  children,
  heading,
  subHeading,
}: {
  children: React.ReactNode
  heading?: string
  subHeading?: string
}) => (
  <div>
    {heading && <h2 className="text-2xl font-bold tracking-tight text-gray-900">{heading}</h2>}
    {subHeading && <p className="mt-2 text-lg leading-8 text-gray-600">{subHeading}</p>}
    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3 sm:grid-cols-2">{children}</div>
  </div>
)

export const MorePosts = async ({ skip, limit }: { skip: string; limit: number }) => {
  const { data } = await sanityFetch({
    query: morePostsQuery,
    params: { skip, limit },
  })

  if (!data || data.length === 0) {
    return null
  }

  return (
    <Posts heading={`More to read`}>
      {data?.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}

export const AllPosts = async () => {
  const { data } = await sanityFetch({ query: allPostsQuery })

  if (!data || data.length === 0) {
    return <div className="text-center py-20">No posts found.</div>
  }

  return (
    <Posts
      heading="All Posts"
    >
      {data.map((post: AllPostsQueryResult[number]) => (
        <Post key={post._id} post={post} />
      ))}
    </Posts>
  )
}
