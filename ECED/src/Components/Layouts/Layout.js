import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

// layout of the entire dash/ route
const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="relative flex flex-col " style={{backgroundColor:'white'}}>
      <Header />
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)]  " style={{backgroundColor:'white'}}>
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className=" mt-1 w-full  dark:from-slate-950 dark:from-75% dark:to-[#200c45] dark:text-slate-400 lg:p-10" style={{background:'white'}}>
            <Outlet />
          </div>
        ) : (
          <Navigate to="/" replace={true} />
        )}
      </main>
    </div>
  );
};

export default Layout;
