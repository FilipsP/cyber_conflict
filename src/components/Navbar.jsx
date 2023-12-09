import { Link } from "react-router-dom"
import {useState} from "react";

function Navbar() {
  const [isDocs,setIsDocs] = useState(false)
  //const [navClasses, setNavClasses] = useState("fixed w-full top-0 text-2xl bg-dark-bg invisible hover:visible");
  const handleSetDocs = value => setIsDocs(value)

  return (
      <nav
          className="fixed w-full top-0 text-2xl bg-dark-bg">
        <div className="h-16 flex justify-between items-center mx-4">
          {isDocs?<div>Menu</div>:<span></span>}
          <ul className="flex justify-end mr-2 md:mr-8 space-x-2 md:space-x-8">
            <Link onClick={()=>handleSetDocs(false )} to="/" className="transition duration-100 ease-out">
              Game
            </Link>
            <Link onClick={()=>handleSetDocs(true)} to="/docs" className="transition duration-100 ease-out">
              Docs
            </Link>
          </ul>
        </div>
    </nav>
  )
}

export default Navbar
