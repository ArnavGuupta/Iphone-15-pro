import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

function Navbar() {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      {/* Left Logo */}
      <div className="flex items-center">
        <img src={appleImg} alt="Apple" height="18" width="18" />
      </div>

      {/* Center Navigation Links */}
      <nav className="flex flex-1 justify-center">
        <div className="flex gap-8 text-sm cursor-pointer">
          {navLists.map((nav) => (
            <span 
              key={nav} 
              className="text-gray-400 hover:text-white transition-all"
            >
              {nav}
            </span>
          ))}
        </div>
      </nav>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        <img src={searchImg} alt="Search" height="18" width="18" />
        <img src={bagImg} alt="Bag" height="18" width="18" />
      </div>
    </header>
  );
}

export default Navbar;
