import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const PaperForm = () => {
  const { user } = useContext(UserContext);
  const [newPaper, setNewPaper] = useState({
    department: user.department,
    teacher: "",
    conference: "",
    title: "",
    ugStudents: false,
    pgStudents: false,
    phdStudents: false,
    faculty: false,
    studentNames: "",
    facultyNames: "",
    year: "2023",
    issn: "",
    affiliatingInstitution: "Yes",
    publisher: "",
    sourceLink: "",
    doi: "",
    proof: null,
    indexing: "Other"
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTeachers = async () => {
      const list = await axios.get("/teacher/list/" + user.department);
      setTeachers(list.data);
    };
    getTeachers();
  }, [user]);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(newPaper).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await axios.post("/paper", formData);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    const { id, type, value, checked } = e.target;
    setNewPaper((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="paper" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 text-5xl font-bold text-violet-950 underline">Add Paper</h2>
          <form className="w-full md:w-2/3 grid grid-cols-2 gap-4">
            <label className="font-bold text-lg" htmlFor="teacher">Teacher:</label>
            <select id="teacher" value={newPaper.teacher} onChange={handleFormChange} required>
              <option hidden>Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
              ))}
            </select>

            <label className="font-bold text-lg" htmlFor="conference">Conference Name:</label>
            <input type="text" id="conference" value={newPaper.conference} onChange={handleFormChange} required />

            <label className="font-bold text-lg" htmlFor="title">Title of the Article:</label>
            <input type="text" id="title" value={newPaper.title} onChange={handleFormChange} required />

            <label className="font-bold text-lg">Collaboration:</label>
            <div>
              <input type="checkbox" id="ugStudents" checked={newPaper.ugStudents} onChange={handleFormChange} /> With UG Students
              <input type="checkbox" id="pgStudents" checked={newPaper.pgStudents} onChange={handleFormChange} /> With PG Students
              <input type="checkbox" id="phdStudents" checked={newPaper.phdStudents} onChange={handleFormChange} /> With PhD Students
              <input type="checkbox" id="faculty" checked={newPaper.faculty} onChange={handleFormChange} /> With Faculty
            </div>

            <label className="font-bold text-lg" htmlFor="studentNames">Name of the Students:</label>
            <input type="text" id="studentNames" value={newPaper.studentNames} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="facultyNames">Name of the Faculty:</label>
            <input type="text" id="facultyNames" value={newPaper.facultyNames} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="year">Year of Publication:</label>
            <input type="number" id="year" value={newPaper.year} onChange={handleFormChange} required />

            <label className="font-bold text-lg" htmlFor="issn">ISSN/ISBN Number:</label>
            <input type="text" id="issn" value={newPaper.issn} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="affiliatingInstitution">Affiliating Institution Same?:</label>
            <select id="affiliatingInstitution" value={newPaper.affiliatingInstitution} onChange={handleFormChange}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label className="font-bold text-lg" htmlFor="publisher">Name of the Publisher:</label>
            <input type="text" id="publisher" value={newPaper.publisher} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="sourceLink">Link to Source:</label>
            <input type="url" id="sourceLink" value={newPaper.sourceLink} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="doi">DOI:</label>
            <input type="text" id="doi" value={newPaper.doi} onChange={handleFormChange} />

            <label className="font-bold text-lg" htmlFor="proof">Upload Proof (PDF):</label>
            <input type="file" id="proof" accept="application/pdf" onChange={(e) => setNewPaper({ ...newPaper, proof: e.target.files[0] })} />

            <label className="font-bold text-lg" htmlFor="indexing">Indexing:</label>
            <select id="indexing" value={newPaper.indexing} onChange={handleFormChange}>
              <option value="Scopus">Scopus</option>
              <option value="SCI">SCI</option>
              <option value="Other">Other</option>
            </select>

            <button className="col-span-2 mb-4 flex h-10 items-center gap-2 rounded-md border border-violet-900 bg-slate-800 px-6 py-2 font-semibold text-slate-200 hover:bg-violet-900" type="submit" onClick={addPaper}>
              <FaPlus /> Add
            </button>
          </form>
          {error && <ErrorStrip error={error} />}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default PaperForm;