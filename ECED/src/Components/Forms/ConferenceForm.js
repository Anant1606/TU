import React, { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import ErrorStrip from "../ErrorStrip";

const ConferenceForm = () => {
  const { user } = useContext(UserContext);
  const [newConference, setNewConference] = useState({
    year: "",
    nameOfFaculty: "",
    typeOfProgram: "",
    duration: "",
    startDate: "",
    endDate: "",
    organisingInstitution: "",
    proofLink: "",
    fundingSupport: "",
    agencyName: "",
    amountSupport: "",
    teacher: ""
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

  const addConference = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Conference/add", newConference);
      navigate("./..");
      toast.success(response.data.message);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleFormChange = (e) => {
    setNewConference({
      ...newConference,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.role === "HOD" || user.role === "admin" || user.role === "teacher" ? (
        <main className="conference-form" style={{ color: "black" }}>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Add Conference
          </h2>
          <form className="w-full md:w-1/3" onSubmit={addConference}>
            <label htmlFor="year">Year:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="year"
              id="year"
              value={newConference.year}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="nameOfFaculty">Name of Faculty:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="nameOfFaculty"
              id="nameOfFaculty"
              value={newConference.nameOfFaculty}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="typeOfProgram">Type of Program:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="typeOfProgram"
              name="typeOfProgram"
              value={newConference.typeOfProgram}
              onChange={handleFormChange}
              required
            >
              <option defaultValue hidden>
                Select Type of Program
              </option>
              <option value="Professional Development Programmes">Professional Development Programmes</option>
              <option value="Orientation/Induction Programmes">Orientation/Induction Programmes</option>
              <option value="Refresher Course">Refresher Course</option>
              <option value="Short Term Course">Short Term Course</option>
            </select>
            <label htmlFor="duration">Duration (in No. of days):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="duration"
              id="duration"
              value={newConference.duration}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="startDate">Start Date:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="startDate"
              id="startDate"
              value={newConference.startDate}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="endDate">End Date:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="date"
              name="endDate"
              id="endDate"
              value={newConference.endDate}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="organisingInstitution">Name of the Organising Institution:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="organisingInstitution"
              id="organisingInstitution"
              value={newConference.organisingInstitution}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="proofLink">Proof (Link to Certificate):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="proofLink"
              id="proofLink"
              value={newConference.proofLink}
              required
              onChange={handleFormChange}
            />
            <label htmlFor="fundingSupport">Funding Support:</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="fundingSupport"
              id="fundingSupport"
              value={newConference.fundingSupport}
              onChange={handleFormChange}
            />
            <label htmlFor="agencyName">Name of the Agency (if outside support):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="text"
              name="agencyName"
              id="agencyName"
              value={newConference.agencyName}
              onChange={handleFormChange}
            />
            <label htmlFor="amountSupport">Amount Support (INR):</label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              type="number"
              name="amountSupport"
              id="amountSupport"
              value={newConference.amountSupport}
              onChange={handleFormChange}
            />
            <label htmlFor="teacher">Teacher:</label>
            <select
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              name="teacher"
              id="teacher"
              value={newConference.teacher}
              required
              onChange={handleFormChange}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>

            {error && <ErrorStrip message={error} />}
            <button
              className="text-md mb-3 mt-2 flex h-10 w-full items-center justify-center rounded-md border-2 border-solid border-violet-900 bg-violet-900 text-white hover:cursor-pointer hover:border-violet-900 hover:bg-violet-950 hover:text-white active:border-white active:text-white dark:border-violet-400 dark:bg-violet-400 dark:text-black dark:hover:bg-violet-300 dark:hover:text-slate-900 dark:active:bg-violet-400 md:text-lg"
              type="submit"
            >
              Add Conference <FaPlus className="ml-1" />
            </button>
          </form>
        </main>
      ) : (
        <Navigate to="/unauthorized" replace />
      )}
    </>
  );
};

export default ConferenceForm;
