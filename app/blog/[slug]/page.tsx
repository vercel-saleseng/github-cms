import ReactMarkdown from "react-markdown"
import { notFound } from "next/navigation"

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const response = await fetch(
    "https://api.github.com/repos/youngbloodcyb/md-demo-content/contents/blog?ref=main"
  )
  const files = (await response.json()) as GithubFile[]

  return files.map((file) => ({
    slug: file.name.split(".")[0],
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const blog = await fetch(
    `https://api.github.com/repos/youngbloodcyb/md-demo-content/contents/blog/${slug}.md?ref=main`
  )

  if (!blog.ok) {
    return notFound()
  }

  const blogContent = (await blog.json()) as GithubFileContent

  // Decode the base64 content
  const decodedContent = Buffer.from(blogContent.content, "base64").toString(
    "utf-8"
  )

  return (
    <main className="p-20">
      <article className="prose">
        <ReactMarkdown>{decodedContent}</ReactMarkdown>
      </article>
    </main>
  )
}
