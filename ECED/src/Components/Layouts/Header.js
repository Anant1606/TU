import React, { useContext } from "react";
import { FaHome, FaUser, FaFileAlt, FaAward } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { setUser, setPaperList } = useContext(UserContext);
  const logout = () => {
    setUser("");
    setPaperList([]);
    localStorage.clear();
    toast.info("Logged Out");
  };

  return (
    <header
      className="absolute top-0 flex w-full justify-between items-center"
      style={{ backgroundColor: "#DADAFF", color: "#50B5A4" }}
    >
      <div className="flex items-center gap-4">
        <Link
          to="/dash"
          className="flex items-center gap-2 px-3 py-1 text-2xl font-semibold sm:text-3xl"
        >
          <img
            src="https://d2lk14jtvqry1q.cloudfront.net/media/small_Thapar_Institute_of_Engineering_and_Technology_Thapar_University_06036259ee_6f106c6e8b_15190eeeb2_65b1d7ffa3.png"
            alt="Thapar Institute of Engineering and Technology Logo"
            className="w-55 h-20 mr-2"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8 flex-1 justify-center">
        {/* Home Button */}
        <Link
          to="/dash"
          className="flex items-center gap-1 text-lg font-semibold text-red-500 hover:text-red-700"
        >
          <FaHome className="text-xl" />
          <span>Home</span>
        </Link>

        {/* Profile Button */}
        <Link
          to="/dash/profile"
          className="flex items-center gap-1 text-lg font-semibold text-red-500 hover:text-red-700"
        >
          <FaUser className="text-xl" />
          <span>Profile</span>
        </Link>

        {/* Research Paper Button */}
        <Link
          to="/dash/ResearchPaperDisplay"
          className="flex items-center gap-1 text-lg font-semibold text-red-500 hover:text-red-700"
        >
          <FaFileAlt className="text-xl" />
          <span>Research Paper</span>
        </Link>

        {/* Fellowship Button */}
        <Link
          to="/dash/fellowship"
          className="flex items-center gap-1 text-lg font-semibold text-red-500 hover:text-red-700"
        >
          <FaAward className="text-xl" />
          <span>Fellowship</span>
        </Link>
      </nav>

      <Link
        to="./"
        className="text-md m-2 mr-4 flex items-center rounded-md p-[7px] font-semibold hover:bg-red-700 hover:text-slate-100"
        onClick={logout}
      >
        <p>&nbsp;Logout&nbsp;&nbsp;</p>
        <FiLogOut className="text-xl" />
      </Link>
    </header>
  );
};

export default Header;
