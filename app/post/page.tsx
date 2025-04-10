import Link from "next/link"

export default async function Page() {
  const response = await fetch(
    "https://api.github.com/repos/youngbloodcyb/md-demo-content/contents/post?ref=main"
  )
  const files = (await response.json()) as GithubFile[]
  console.log(files)

  return (
    <main className="p-20">
      <h1>Posts</h1>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            <Link href={`/post/${file.name.split(".")[0]}`}>
              {file.name.split(".")[0]}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
