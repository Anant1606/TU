import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext"; // Adjust the path as necessary
import { AiFillBook } from "react-icons/ai";

const ResPaper = () => {
  const { resPaper, setResPaper } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("/ReserchPaper/research-paper");
        console.log("Fetched Data:", response.data); // Log the fetched data

        if (!Array.isArray(response.data) || response.data.length === 0) {
          setError("No Research Papers found");
        } else {
          setResPaper(response.data);
        }
      } catch (err) {
        setError("Failed to fetch research papers. Please try again.");
        console.error("Error fetching papers:", err); // Log the error
      }
    };

    getNotes();

    return () => setResPaper([]); // Clean up on unmount
  }, [setResPaper]);

  console.log("Current State of resPaper:", resPaper); // Log the current state of resPaper

  return (
    <main className="paper">
      <h2 className="mb-2 mt-3 text-4xl font-bold text-violet-950 underline decoration-2 underline-offset-4">
        Research Papers
      </h2>
      {error && <p className="text-lg text-red-500">{error}</p>}
      {Array.isArray(resPaper) && resPaper.length > 0 ? (
        <section className="pt-4">
          {resPaper.map((resPaperItem) => (
            <Link
              to={`/research-paper/${resPaperItem._id}`}  // Use the paper ID for dynamic route
              key={resPaperItem._id}
            >
              <article className="mb-4 flex items-center rounded-md border-2 border-slate-900 bg-violet-200 p-2 hover:bg-violet-950 hover:text-slate-100 dark:border-slate-200 dark:bg-slate-950/5 dark:hover:border-slate-200 dark:hover:bg-slate-950/80">
                <AiFillBook className="text-[3rem]" />
                <div>
                  <h3 className="px-1 text-xl font-semibold">{resPaperItem.paper}</h3>
                  <hr className="border-[1px]" />
                  <p className="px-2 text-sm font-medium">{resPaperItem.year}</p>
                  <p className="px-2 text-sm">By: {resPaperItem.teacher.name}</p>
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
