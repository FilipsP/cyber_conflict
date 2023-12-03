import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="fixed w-full top-0 text-2xl bg-dark-bg">
      <div className="h-16 flex justify-between items-center mx-4">
        <div>Menu</div>
        <ul className="flex justify-end mr-2 md:mr-8 space-x-2 md:space-x-8">
          <Link to="/" className="transition duration-100 ease-out">
            Game
          </Link>
          <Link to="/docs" className="transition duration-100 ease-out">
            Docs
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
