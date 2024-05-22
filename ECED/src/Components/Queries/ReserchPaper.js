import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";

const ResPaper = () => {
  const { setResPaper, RespaperList = [] } = useContext(UserContext);
  const [error, setError] = useState("");
  const { user } = React.useContext(UserContext);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("/research-paper/teacher/"+ user._id);
        if (!response.data.length) {
          setError("No Research Papers found");
        } else {
          setResPaper(response.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getNotes();

    return () => setResPaper([]);
  }, [setResPaper]);

  return (
    <main className="paper">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Research Papers
      </h2>
      {error && <p className="text-lg text-red-500">{error}</p>}
      {RespaperList.length ? (
        <section className="pt-4">
          {RespaperList.map((ResPaper, index) => (
            <Link to={ResPaper.ResPaper} key={index} onClick={() => setResPaper(ResPaper)}>
              <article className="mb-4 flex items-center whitespace-break-spaces rounded-md border-2 border-slate-900 bg-violet-200 p-2 hover:bg-violet-950 hover:text-slate-100 dark:border-slate-200 dark:bg-slate-950/5 dark:hover:border-slate-200 dark:hover:bg-slate-950/80 lg:p-4 ">
                <AiFillBook className="text-[3rem] lg:text-[4rem]" />
                <div className="">
                  <h3 className="px-1 text-xl font-semibold lg:px-2 lg:text-2xl">
                    {ResPaper.ResPaper}
                  </h3>
                  <hr className="border-[1px]" />
                  <p className="px-2 text-sm font-medium lg:text-base ">
                    {ResPaper.year}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        !error && <p className="text-lg">No Research Papers Found.</p>
      )}
    </main>
  );
};

export default ResPaper;
