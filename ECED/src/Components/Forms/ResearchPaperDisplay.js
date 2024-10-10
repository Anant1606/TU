import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaDownload } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import ErrorStrip from "../ErrorStrip";
import { getDownloadURL, ref } from "firebase/storage"; // Import from Firebase
import { storage } from "../../Components/Forms/firebase"; // Correct import path for firebase.js

const ResearchPaperDisplay = () => {
  const { user } = useContext(UserContext);
  const [researchPapers, setResearchPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResearchPapers = async () => {
      try {
        const response = await axios.get(`/ReserchPaper/research-paper`);
        const papers = response.data;

        // Fetch the download URL for each research paper
        const papersWithDownloadURLs = await Promise.all(
          papers.map(async (paper) => {
            if (paper.firebasePath) {
              try {
                const downloadURL = await getDownloadURL(ref(storage, paper.firebasePath));
                return { ...paper, downloadURL };
              } catch (err) {
                console.error("Error fetching download URL from Firebase:", err);
                return paper;
              }
            }
            return paper;
          })
        );

        setResearchPapers(papersWithDownloadURLs);
      } catch (err) {
        setError("Failed to fetch research papers. Please try again later.");
        console.error("Error fetching research papers:", err);
      }
    };

    fetchResearchPapers();
  }, [user]);

  return (
    <>
      {user.role === "HOD" || user.role === "admin" || user.role === "teacher" ? (
        <main className="research-paper-display" style={{ color: "black" }}>
          <h2 className="mb-4 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Research Papers Display Page
          </h2>
          {error && <ErrorStrip message={error} />}
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border-b border-gray-300">Title</th>
                <th className="p-2 border-b border-gray-300">Teacher</th>
                <th className="p-2 border-b border-gray-300">Year</th>
                <th className="p-2 border-b border-gray-300">Publisher</th>
                <th className="p-2 border-b border-gray-300">Link</th>
                <th className="p-2 border-b border-gray-300">Download</th>
              </tr>
            </thead>
            <tbody>
              {researchPapers.length > 0 ? (
                researchPapers.map((paper) => (
                  <tr key={paper._id}>
                    <td className="p-2 border-b border-gray-300">{paper.title}</td>
                    <td className="p-2 border-b border-gray-300">{paper.teacher?.name || "N/A"}</td>
                    <td className="p-2 border-b border-gray-300">{paper.year}</td>
                    <td className="p-2 border-b border-gray-300">{paper.publisher}</td>
                    <td className="p-2 border-b border-gray-300">
                      <a href={paper.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Paper
                      </a>
                    </td>
                    <td className="p-2 border-b border-gray-300">
                      {paper.downloadURL ? (
                        <a
                          href={paper.downloadURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-violet-800 hover:text-violet-600"
                          download
                        >
                          <FaDownload size={18} />
                        </a>
                      ) : (
                        "No PDF Available"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 border-b border-gray-300" colSpan="6">
                    No research papers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      ) : (
        <Navigate to="/unauthorized" replace />
      )}
    </>
  );
};

export default ResearchPaperDisplay;
