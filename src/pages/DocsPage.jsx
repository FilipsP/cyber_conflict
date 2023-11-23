import { useEffect, useState } from "react"
import Sidebar from "../components/Sidebar"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"

function extractHeadings(markdownContent) {
  const regex = /^#+\s*(.*?)\s*$/gm
  let match
  const headings = []

  while ((match = regex.exec(markdownContent)) !== null) {
    const headingText = match[1]
    const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    headings.push({ id, text: headingText })
    //const level = match[0].split(" ")[0].length
    //const text = match[1].trim()
    //headings.push({ level, text })
  }

  return headings

  // * Sort headings by level
  //return headings.sort((a, b) => a.level - b.level)
}

function DocsPage() {
  const [markdownContent, setMarkdownContent] = useState("")
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    fetch("markdownText.md")
      .then((res) => res.text())
      .then((text) => {
        const extractedHeadings = extractHeadings(text)
        let newText = text
        headings.forEach((heading) => {
          newText = newText.replace(
            heading.text,
            `<a id="${heading.id}">${heading.text}</a>`
          )
        })
        setMarkdownContent(newText)
        setHeadings(extractedHeadings)
      })
  }, [])

  return (
    <div>
      <Sidebar headings={headings} />
      <div className="container-md mx-auto flex justify-center ">
        <div className="p-6 prose prose-invert text-xl">
          <Markdown rehypePlugins={[rehypeRaw]}>{markdownContent}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
