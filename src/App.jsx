import "./App.css"
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import GamePage from "./pages/GamePage"
import DocsPage from "./pages/DocsPage"

function App() {
  return (
    <div>
      <Navbar />
      <div className="mt-16">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
