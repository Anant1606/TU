import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config/api/axios";

const ResearchPaperDetail = () => {
  const { id } = useParams(); // Get the paper ID from the URL
  const [paper, setPaper] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(`/ReserchPaper/research-paper/${id}`);
        setPaper(response.data);
      } catch (err) {
        setError("Failed to fetch research paper details.");
      }
    };

    fetchPaper();
  }, [id]);
  console.log("Paper ID:", id);

  if (error) {
    return <p>{error}</p>;
  }

  if (!paper) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{paper.paper}</h1>
      <p>Year: {paper.year}</p>
      <p>Author: {paper.teacher.name}</p>
      {/* You can add more details here as needed */}
    </div>
  );
};

export default ResearchPaperDetail;
