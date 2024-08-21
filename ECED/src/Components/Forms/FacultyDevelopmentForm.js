import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const FacultyDevelopmentForm = () => {
  const { user } = useContext(UserContext);
  const [newProgram, setNewProgram] = useState({
    year: "",
    nameOfFaculty: "",
    typeOfProgram: "",
    duration: "",
    startDate: "",
    endDate: "",
    organizingInstitution: "",
    proofLink: "",
    teacher: "" // Added teacher field
  });
  const [error, setError] = useState("");
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const list = await axios.get(`/teacher/list/${user.department}`);
        setTeachers(list.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    getTeachers();
  }, [user]);

  const addProgram = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/faculty-development/add", newProgram);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setNewProgram({
      ...newProgram,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" || user.role === "admin" || user.role === "teacher" ? (
        <main className="faculty-development-form" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Faculty Development Program
          </h2>
          <form className="w-full md:w-1/3" onSubmit={addProgram}>
            <label htmlFor="year">Year:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="year"
              id="year"
              min="2000"
              max="2030"
              required
              value={newProgram.year}
              onChange={handleFormChange}
            />
            <label htmlFor="nameOfFaculty">Name of Faculty:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="nameOfFaculty"
              id="nameOfFaculty"
              value={newProgram.nameOfFaculty}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="typeOfProgram">Type of Program:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="typeOfProgram"
              id="typeOfProgram"
              value={newProgram.typeOfProgram}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="duration">Duration (in No. of days):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="duration"
              id="duration"
              required
              value={newProgram.duration}
              onChange={handleFormChange}
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="startDate"
              id="startDate"
              required
              value={newProgram.startDate}
              onChange={handleFormChange}
            />
            <label htmlFor="endDate">End Date:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="endDate"
              id="endDate"
              required
              value={newProgram.endDate}
              onChange={handleFormChange}
            />
            <label htmlFor="organizingInstitution">Name of the Organizing Institution:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="organizingInstitution"
              id="organizingInstitution"
              value={newProgram.organizingInstitution}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="proofLink">Proof (Link to Certificate/Letter):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="proofLink"
              id="proofLink"
              value={newProgram.proofLink}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="teacher">Select Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="teacher"
              name="teacher"
              value={newProgram.teacher}
              onChange={handleFormChange}
              required
            >
              <option defaultValue hidden>Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <button
              className="mb-4 flex h-10 w-auto items-center gap-2 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-6 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900"
              type="submit"
            >
              <FaPlus />
              Add Program
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

export default FacultyDevelopmentForm;
