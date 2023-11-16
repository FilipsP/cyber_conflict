import { useState } from "react"
import { BiMenuAltLeft } from "react-icons/bi"
import { IoMdClose } from "react-icons/io"

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <div>
      <button
        className="m-2 p-1 hover:bg-gray-600 rounded md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <BiMenuAltLeft className="text-4xl" />
      </button>
      <aside
        className={` transition-all duration-500 ease-in-out transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed mt-16 top-0 left-0 bg-dark-bg w-64 h-screen border-t-4 border-t-gray-700`}
      >
        <button
          className="absolute top-0 right-0 p-0.5 m-2 md:hidden hover:bg-gray-600 rounded"
          onClick={() => setIsSidebarOpen(false)}
        >
          <IoMdClose className="text-4xl" />
        </button>
        <div className="h-full px-3 py-2 mt-10 overflow-y-auto">
          <ul className="space-y-2 font-medium text-2xl">
            <li>
              <a
                href="#"
                className="flex items-center rounded-lg hover:bg-gray-700 group p-2"
              >
                Introduction
              </a>
              <a
                href="#"
                className="flex items-center rounded-lg hover:bg-gray-700 group p-2"
              >
                Introduction
              </a>
              <a
                href="#"
                className="flex items-center rounded-lg hover:bg-gray-700 group p-2"
              >
                Introduction
              </a>
              <a
                href="#"
                className="flex items-center rounded-lg hover:bg-gray-700 group p-2"
              >
                Introduction
              </a>
              <a
                href="#"
                className="flex items-center rounded-lg hover:bg-gray-700 group p-2"
              >
                Introduction
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
