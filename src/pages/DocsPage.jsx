import Sidebar from "../components/Sidebar"
import ReactMarkdown from "react-markdown"
import { useEffect, useState } from "react"

function DocsPage() {
  const [markdownContent, setMarkdownContent] = useState("")

  useEffect(() => {
    fetch("/rules/testMdFile2.md")
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
  }, [])

  return (
    <div>
      <Sidebar />
      <div className="md:ml-64 p-4 prose prose-invert">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  )
}

export default DocsPage
