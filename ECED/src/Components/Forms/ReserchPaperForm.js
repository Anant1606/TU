import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";
// import storage from './firebase'
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const ResearchPaperForm = () => {
  const { user } = useContext(UserContext);
  const [newResearchPaper, setNewResearchPaper] = useState({
    department: user.department,
    paper: "",
    year: "2023",
    teacher: "",
    title: "",
    issnno: "",
    publisher: "",
    link: ""
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const list = await axios.get("/teacher/list/" + user.department);
        setTeachers(list.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    getTeachers();
  }, [user]);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/ReserchPaper/research-paper", newResearchPaper);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setNewResearchPaper({
      ...newResearchPaper,
      [e.target.id]: e.target.value,
    });
  };

  // upload pdf tot firebase 

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `/pdfs/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <>
      {user.role === "HOD" ||"admin" ? (
        <main className="paper" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Research Paper
          </h2>
          <form className="w-full md:w-1/3" onSubmit={addPaper}>
            <label htmlFor="department">Department:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              name="department"
              type="text"
              required
              id="department"
              value={newResearchPaper.department}
              disabled
            />
            <label htmlFor="paper">Research Paper:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="paper"
              id="paper"
              value={newResearchPaper.paper}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="year">Year:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={newResearchPaper.year}
              onChange={handleFormChange}
            />
            <label htmlFor="title">Title:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="title"
              id="title"
              value={newResearchPaper.title}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="issnno">ISSN No.:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="issnno"
              id="issnno"
              value={newResearchPaper.issnno}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="publisher">Publisher:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="publisher"
              id="publisher"
              value={newResearchPaper.publisher}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="link">Link:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="link"
              id="link"
              value={newResearchPaper.link}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="teacher">Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              required
              id="teacher"
              name="teacher"
              value={newResearchPaper.teacher}
              onChange={handleFormChange}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {/* <button>Upload PDF</button> */}
      <p>Upload Progress: {progress}%</p>
    </div>
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
              onClick={handleUpload}
            >
              <FaPlus />
              Add
            </button>
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default ResearchPaperForm;
