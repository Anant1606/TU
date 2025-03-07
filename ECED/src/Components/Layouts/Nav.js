import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { PiStudent, PiUser, PiBooks } from "react-icons/pi";



const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <nav
    id="nav"
    className="z-0 hidden h-screen flex-col justify bg-slate-950 px-4 py-4 text-slate-100 dark:bg-gradient-to-b dark:to-95% lg:flex"
    style={{ backgroundColor: '#DADAFF', color: 'black', marginTop: '36px', fontFamily: 'Barlow, sans-serif' }}
  >
  
      <ul className="m-auto flex flex-grow flex-col items-center justify-start gap-[6px]">
        <NavLink to={"./paper"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <GiBookshelf className="pt-[0.1rem] text-2xl  " />
            Papers
          </li>
        </NavLink>
        <NavLink to={"./attendance"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <IoCalendarOutline className="pt-[0.1rem] text-2xl  " />
            Attendance
          </li>
        </NavLink>
        <NavLink to={"./internal"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <HiOutlineDocumentReport className="pt-[0.1rem] text-2xl  " />
            Internal Mark
          </li>
          
        </NavLink>
        <NavLink to={"./time_schedule"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <AiOutlineSchedule className="pt-[0.1rem] text-2xl  " />
            Time Schedule
          </li>
        </NavLink>
        <NavLink to={"./ResearchPaper"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <AiOutlineSchedule className="pt-[0.1rem] text-2xl  " />
            ResearchPaper
          </li>
        </NavLink>
        {user.role === "HOD" && (
          <>
            <NavLink to={"./add_paper"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <BiBookAdd className="pt-[0.1rem] text-2xl  " />
                Add Paper
              </li>
            </NavLink>
            <NavLink to={"./approve_teacher"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <RiUserAddLine className="pt-[0.1rem] text-2xl  " />
                Approve Teacher
              </li>
            </NavLink>
            <NavLink to={"./ResPaper"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <RiUserAddLine className="pt-[0.1rem] text-2xl  " />
                View Your Reserch Paper
              </li>
            </NavLink>
            <NavLink to={"./filter"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <RiUserAddLine className="pt-[0.1rem] text-2xl  " />
                Filter
              </li>
            </NavLink>
          </>
        )}
        {user.role === "student" && (
          <NavLink to={"./join_paper"} className="w-full font-medium">
            <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
              <PiBooks className="pt-[0.1rem] text-2xl  " />
              Manage Paper
            </li>
          </NavLink>
        )}
      </ul>
      <ul className="flex flex-grow flex-col items-start justify-end gap-[6px]">
        <NavLink to={"./profile"} className="w-full font-bold">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            {user.role === "student" ? (
              <PiStudent className="pt-[0.1rem] text-2xl" />
            ) : (
              <PiUser className="pt-[0.1rem] text-2xl" />
            )}
            {user.name}
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
