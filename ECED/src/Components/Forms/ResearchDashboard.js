import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";

const ResearchDashboard = () => {
  const { user } = useContext(UserContext);
  const [researchPapers, setResearchPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        const response = await axios.get("/ReserchPaper/research-papers");
        setResearchPapers(response.data);
      } catch (err) {
        setError("Error fetching research papers");
      }
    };
    fetchResearchPapers();
  }, []);

  return (
    <div className="paper" style={{ color: "black" }}>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Research Papers
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
            <th className="block md:table-cell">Department</th>
            <th className="block md:table-cell">Paper</th>
            <th className="block md:table-cell">Year</th>
            <th className="block md:table-cell">Title</th>
            <th className="block md:table-cell">ISSN No.</th>
            <th className="block md:table-cell">Publisher</th>
            <th className="block md:table-cell">Link</th>
            <th className="block md:table-cell">Teacher</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {researchPapers.map((paper) => (
            <tr key={paper._id} className="border border-grey-500 md:border-none block md:table-row">
              <td className="block md:table-cell">{paper.department}</td>
              <td className="block md:table-cell">{paper.paper}</td>
              <td className="block md:table-cell">{paper.year}</td>
              <td className="block md:table-cell">{paper.title}</td>
              <td className="block md:table-cell">{paper.issnno}</td>
              <td className="block md:table-cell">{paper.publisher}</td>
              <td className="block md:table-cell"><a href={paper.link} target="_blank" rel="noopener noreferrer">Link</a></td>
              <td className="block md:table-cell">{paper.teacher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResearchDashboard;
