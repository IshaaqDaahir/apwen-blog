import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'
import { Suspense } from 'react'

import Avatar from '@/app/components/Avatar'
import { MorePosts } from '@/app/components/Posts'
import PortableText from '@/app/components/PortableText'
import Image from '@/app/components/SanityImage'
import { sanityFetch } from '@/sanity/lib/live'
import { postPagesSlugs, postQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'
import SocialShare from '@/app/components/SocialShare'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const { data: post } = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  })
  const previousImages = (await parent).openGraph?.images || []
  const ogImage = resolveOpenGraphImage(post?.coverImage)

  return {
    authors:
      post?.author?.firstName && post?.author?.lastName
        ? [{ name: `${post.author.firstName} ${post.author.lastName}` }]
        : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata
}

export default async function PostPage(props: Props) {
  const params = await props.params
  const [{ data: post }] = await Promise.all([sanityFetch({ query: postQuery, params })])

  if (!post?._id) {
    return notFound()
  }



  // Determine URL for sharing (assuming domain or use relative if not available)
  // For now using localhost or empty, should ideally be configured via env
  const shareUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/posts/${post.slug}`
    : `http://localhost:3000/posts/${post.slug}`

  return (
    <>
      <div className="">
        <div className="container my-12 lg:my-24 grid gap-12">
          <div>
            <div className="pb-6 grid gap-6 mb-6 border-b border-gray-100">
              <div className="max-w-3xl flex flex-col gap-6">

                <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl font-bold tracking-tight">{post.title}</h1>
              </div>
              <div className="max-w-3xl flex gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  {post.author && post.author.firstName && post.author.lastName && (
                    <Avatar person={post.author} date={post.date} />
                  )}
                </div>
              </div>
            </div>

            <article className="max-w-4xl mx-auto">
              {/* Media Section: Video or Image */}
              <div className="mb-10">
                {/* YouTube/Vimeo URL embed */}
                {post.videoUrl && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black">
                    <iframe
                      src={(post.videoUrl as string).replace('watch?v=', 'embed/')}
                      className="w-full h-full"
                      allowFullScreen
                      title="Video"
                    />
                  </div>
                )}

                {/* Uploaded video file */}
                {!post.videoUrl && post.video?.asset?.url && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black">
                    <video
                      src={post.video.asset.url}
                      className="w-full h-full"
                      controls
                      preload="metadata"
                    />
                  </div>
                )}

                {/* Cover image (only show if no video) */}
                {!post.videoUrl && !post.video?.asset?.url && post.coverImage && (
                  <Image
                    id={post.coverImage.asset?._id || ''}
                    alt={post.coverImage.alt || ''}
                    className="rounded-xl w-full shadow-lg"
                    width={1024}
                    height={538}
                    mode="cover"
                    hotspot={post.coverImage.hotspot}
                    crop={post.coverImage.crop}
                  />
                )}
              </div>

              {post.content?.length && (
                <div className="prose prose-lg prose-headings:font-bold prose-a:text-brand-600 max-w-none">
                  <PortableText
                    value={post.content as PortableTextBlock[]}
                  />
                </div>
              )}

              <SocialShare url={shareUrl} title={post.title} />



            </article>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container py-12 lg:py-24 grid gap-12">
          <aside>
            <Suspense>{await MorePosts({ skip: post._id, limit: 3 })}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
