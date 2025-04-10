import Link from "next/link"

export default async function Page() {
  const response = await fetch(
    "https://api.github.com/repos/youngbloodcyb/md-demo-content/contents/blog?ref=main"
  )
  const files = (await response.json()) as GithubFile[]
  console.log(files)

  return (
    <main className="p-4">
      <h1>Blog</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <Link href={`/blog/${file.name.split(".")[0]}`}>
              {file.name.split(".")[0]}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
